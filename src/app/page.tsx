import Footer from './_components/footer'
import HeroSection from './_components/hero'
import Marcas from './_components/marcas'
import Rubros from './_components/rubros'
import QuienesSomos from './_components/quienes-somos'

export default function Home() {
  return (
    <div className='w-full'>
      <HeroSection />
      <QuienesSomos />
      <Rubros />
      <Marcas />
    </div>
  )
}
