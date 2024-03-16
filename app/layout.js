import '@/styles/global.css';

export const metadata = {
	title: "신촌 메뉴판",
	description: "신촌 맛집 메뉴 가격별 모아보기",
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
		description: '신촌 맛집 모든 메뉴들을 한 눈에',
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
		</html>
	);
}
