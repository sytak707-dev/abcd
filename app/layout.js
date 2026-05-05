import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SERVICE_NAME, SERVICE_TAGLINE } from '@/lib/constants'

const notoSans = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  preload: false,
  variable: '--font-noto',
})

export const metadata = {
  title: `${SERVICE_NAME} — ${SERVICE_TAGLINE}`,
  description: '에이전시가 하던 일을 1/8 비용으로 직접 보세요. 광고, 콘텐츠, 실시간 대시보드까지.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSans.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B7GZ5J8XBG"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B7GZ5J8XBG');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
