import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {/* otherOptions… */}
});

const cspHeader = `
    default-src 'self' *.public.blob.vercel-storage.com esm.sh;
    script-src 'self' *.vercel-scripts.com 'unsafe-eval' 'unsafe-inline' blob:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = withMdx({
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['vscode-oniguruma', 'shiki'],
  },
  // Support MDX files as pages:
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: cspHeader.replace(/\n/g, ''),
  //         },
  //       ],
  //     },
  //   ]
  // },
})

export default nextConfig;