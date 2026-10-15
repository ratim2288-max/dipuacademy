/**
 * Dipu Academy — Automated Database Backup Utility
 * Exports all collections from MongoDB Atlas / Local MongoDB to timestamped JSON archives.
 * Suitable for running manually, via cron (every 6 hours / daily), or Windows Task Scheduler.
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const BACKUP_ROOT = path.join(__dirname, '../backups');
const MAX_BACKUPS_RETAINED = 28; // 7 days of 6-hour backups

async function runBackup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDirName = `backup_${timestamp}`;
  const targetDir = path.join(BACKUP_ROOT, backupDirName);

  console.log(`[Backup Engine] Starting automated MongoDB snapshot at: ${new Date().toLocaleString()}`);
  console.log(`[Backup Engine] Target destination: ${targetDir}`);

  if (!fs.existsSync(BACKUP_ROOT)) {
    fs.mkdirSync(BACKUP_ROOT, { recursive: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('✅ Connected to MongoDB Atlas successfully.');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`[Backup Engine] Found ${collections.length} collections to snapshot.`);

    const manifest = {
      timestamp: new Date().toISOString(),
      database: db.databaseName,
      collections: {},
      totalDocuments: 0,
      status: 'SUCCESS',
    };

    for (const colInfo of collections) {
      const colName = colInfo.name;
      // Skip system collections
      if (colName.startsWith('system.')) continue;

      const col = db.collection(colName);
      const docs = await col.find({}).toArray();
      const colFilePath = path.join(targetDir, `${colName}.json`);

      fs.writeFileSync(colFilePath, JSON.stringify(docs, null, 2), 'utf8');
      manifest.collections[colName] = docs.length;
      manifest.totalDocuments += docs.length;
      console.log(`  ✓ Backed up collection [${colName}]: ${docs.length} documents -> ${colName}.json`);
    }

    const manifestPath = path.join(targetDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`✅ Snapshot complete! Total documents backed up: ${manifest.totalDocuments}`);

    // Prune older backups if exceeding MAX_BACKUPS_RETAINED
    pruneOldBackups();
  } catch (error) {
    console.error('❌ Backup failed with error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('[Backup Engine] Database connection closed.');
  }
}

function pruneOldBackups() {
  try {
    const entries = fs.readdirSync(BACKUP_ROOT, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('backup_'))
      .map(dirent => ({
        name: dirent.name,
        path: path.join(BACKUP_ROOT, dirent.name),
        time: fs.statSync(path.join(BACKUP_ROOT, dirent.name)).ctimeMs,
      }))
      .sort((a, b) => b.time - a.time);

    if (entries.length > MAX_BACKUPS_RETAINED) {
      const toDelete = entries.slice(MAX_BACKUPS_RETAINED);
      console.log(`[Backup Engine] Retention Policy: Pruning ${toDelete.length} expired backups...`);
      for (const item of toDelete) {
        fs.rmSync(item.path, { recursive: true, force: true });
        console.log(`  - Removed expired backup: ${item.name}`);
      }
    }
  } catch (e) {
    console.warn('[Backup Engine] Retention pruning notice:', e.message);
  }
}

if (require.main === module) {
  runBackup();
}

module.exports = { runBackup };
