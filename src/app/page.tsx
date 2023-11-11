import Footer from './_components/footer'
import HeroSection from './_components/hero'
import Marcas from './_components/marcas'
import Productos from './_components/productos'
import QuienesSomos from './_components/quienes-somos'

export default function Home() {
  return (
    <div className='w-full'>
      <HeroSection />
      <QuienesSomos />
      <Productos />
      <Marcas />
      <Footer />
      <div className='mt-10'>Otra cosa</div>
    </div>
  )
}
