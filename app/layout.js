import { Noto_Sans_KR } from 'next/font/google'
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
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
