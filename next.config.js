/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/nordpool/predictions',
				destination:
					'https://www.nordpoolgroup.com/api/marketdata/page/10?currency=,,DKK,DKK',
			},
			{
				source: '/api/nordpool/monthly',
				destination:
					'https://www.nordpoolgroup.com/api/marketdata/page/11?currency=,,DKK,DKK',
			},
		]
	},
}

module.exports = nextConfig
