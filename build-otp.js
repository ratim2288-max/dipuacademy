const esbuild = require('esbuild');

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['components/ui/mount.tsx'],
      bundle: true,
      outfile: 'public/js/otp-react-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ OTP Component bundle created at public/js/otp-react-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/course-interactive.tsx'],
      bundle: true,
      outfile: 'public/js/course-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Course Interactive bundle created at public/js/course-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/features-section.tsx'],
      bundle: true,
      outfile: 'public/js/features-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Features Section bundle created at public/js/features-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/dashboard-suite.tsx'],
      bundle: true,
      outfile: 'public/js/dashboard-suite-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Dashboard Suite bundle created at public/js/dashboard-suite-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/hero-section.tsx'],
      bundle: true,
      outfile: 'public/js/hero-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Hero Section bundle created at public/js/hero-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/course-explorer.tsx'],
      bundle: true,
      outfile: 'public/js/course-explorer-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Course Explorer bundle created at public/js/course-explorer-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/trust-testimonials.tsx'],
      bundle: true,
      outfile: 'public/js/trust-testimonials-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    await esbuild.build({
      entryPoints: ['components/ui/navbar.tsx'],
      bundle: true,
      outfile: 'public/js/navbar-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Navbar bundle created at public/js/navbar-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/player-suite.tsx'],
      bundle: true,
      outfile: 'public/js/player-suite-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Player Suite TypeScript bundle created at public/js/player-suite-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/dipu-dashboard.tsx'],
      bundle: true,
      outfile: 'public/js/dipu-dashboard-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Dipu Dashboard TypeScript bundle created at public/js/dipu-dashboard-bundle.js');

    await esbuild.build({
      entryPoints: ['components/ui/dipu-profile.tsx'],
      bundle: true,
      outfile: 'public/js/dipu-profile-bundle.js',
      minify: true,
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });
    console.log('✅ Dipu Profile TypeScript bundle created at public/js/dipu-profile-bundle.js');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

build();

