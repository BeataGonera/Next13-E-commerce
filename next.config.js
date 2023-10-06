/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
	},
	images: {
		domains: ["media.graphassets.com"],
	},
	redirects: async () => {
		return [
			{
				source: "/categories/t-shirts",
				destination: "/categories/t-shirts/1",
				permanent: false, //przeglądarka nie będzie cashować
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
