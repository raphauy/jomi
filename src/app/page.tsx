import Footer from './_components/footer'
import HeroSection from './_components/hero'
import Marcas from './_components/marcas'
import Categorias from './_components/categorias'
import QuienesSomos from './_components/quienes-somos'

export default function Home() {
  return (
    <div className='w-full'>
      <HeroSection />
      <QuienesSomos />
      <Categorias />
      <Marcas />
    </div>
  )
}
