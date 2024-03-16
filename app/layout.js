import '@/styles/global.css';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
	title: "신촌 메뉴판",
	description: "신촌 맛집 메뉴들 가격별로 모아보기",
	applicationName: '신촌 메뉴판',
	referrer: 'origin-when-cross-origin',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: 'https://menupan.xyz/favicon.ico',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: 'https://menupan.xyz/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: 'https://menupan.xyz/main-logo.png',
		},
	],
	openGraph: {
		title: '신촌 메뉴판',
		description: '신촌 맛집 메뉴들 가격별로 모아보기',
		type: 'website',
		url: 'https://menupan.xyz',
		siteName: '신촌 메뉴판',
		images: [
			{
				url: 'https://menupan.xyz/og-image.png',
				width: 800,
				height: 600,
			}
		]
	},
	
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>{children}</body>
			{process.env.NODE_ENV !== 'development' && <GoogleAnalytics gaId={process.env.GA_ID} />}
		</html>
	);
}
