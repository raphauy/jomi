import SessionProvider from '@/components/SessionProvider'
import { MobileSidebar } from '@/components/header/_mobile/mobile-sidebar'
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import getSession from '@/lib/auth'
import { helveticaMedium } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"


export const metadata: Metadata = {
  title: 'JOMI Representaciones',
  description: 'Somos JOMI Representaciones. Distribuidores y representantes oficiales de marcas LÍDERES a nivel mundial.',
  icons: {
    icon: "/favicon.ico",
  },  
}

export const viewport: Viewport = {
  themeColor: "light",  
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session= await getSession()
  return (    
    <>
      <html lang="es" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-black text-black antialiased", helveticaMedium.className)}>
            <SessionProvider session={session}>
          

            <ThemeProvider attribute="class" defaultTheme="light">
              <div className="relative flex flex-col min-h-screen">
                <Header><Menu /></Header>
                <MobileSidebar />

                <div className="flex flex-col items-center flex-1 md:pt-20">
                  <div className='flex-1 w-full'>{children}</div>
                  <Analytics />
                  <Toaster />
                </div>
              </div>            
              <TailwindIndicator />
            </ThemeProvider>

            </SessionProvider>
        </body>
      </html>
    </>
  )
}
