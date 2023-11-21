import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import SessionProvider from '@/components/SessionProvider'
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { cn } from '@/lib/utils'
import getSession from '@/lib/auth'
import { MobileSidebar } from '@/components/header/_mobile/mobile-sidebar'
import { butlerBlack, butlerBold, butlerLight, butlerMedium, butlerRegular, helveticaBlack, helveticaBold, helveticaHeavy, helveticaMedium, helveticaRoman, helveticaThin } from '@/lib/fonts'
import Footer from './_components/footer'


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

                <div className="flex flex-col items-center flex-1 pt-20">
                  <div className='flex-1 w-full'>{children}</div>
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
