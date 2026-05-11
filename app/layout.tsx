import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '@/components/ui/Header'
// import { MascotCompanion } from '@/components/mascot/MascotCompanion' // paused — see issue #2

export const metadata: Metadata = {
  title: { default: 'TripiThai', template: '%s | TripiThai' },
  description: 'ค้นหาและเรียนรู้พระไตรปิฎกภาษาไทย — ค้นหาด้วย keyword, ถาม-ตอบด้วย AI, อ่านแบบ Wiki',
  keywords: ['พระไตรปิฎก', 'พระพุทธศาสนา', 'ธรรมะ', 'Buddhism', 'Tipitaka'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-900 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
