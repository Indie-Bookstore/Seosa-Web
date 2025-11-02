import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  images: {
    // TODO: 한번 정리 필요
    domains: ["imagedelivery.net", "fastly.picsum.photos", "cdn.pixabay.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/proxy/seo-sa/:path*", // get everything after /api/
        destination: `${process.env.MAIN_SERVER_URL}/:path*`, // send it to your API
      },
    ];
  },

  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [{ removeViewBox: false }, { removeDimensions: true }],
              },
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
