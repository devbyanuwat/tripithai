import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'
import { MobileMenuProvider } from '@/components/ui/MobileMenuContext'

interface ChromeLayoutProps {
  children: React.ReactNode
}

export function ChromeLayout({ children }: ChromeLayoutProps) {
  return (
    <MobileMenuProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  )
}
