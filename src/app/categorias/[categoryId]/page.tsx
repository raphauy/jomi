import Footer from "@/app/_components/footer"
import { helveticaLight } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { getCategoryDAO } from "@/services/category-services"
import { getProductDAO } from "@/services/product-services"
import SliderProducts from "./slider-productos"
import { ProductCard } from "./product-card"

type Props = {
    params: {
        categoryId: string
    }
    searchParams: {
        productId?: string
    }
}

export default async function MarcaPage({ params, searchParams }: Props) {
    
    const category= await getCategoryDAO(params.categoryId)
    if (!category) return (<div>Categoría no encontrada</div>)

    const productId= searchParams.productId
    const product= productId && await getProductDAO(productId)

    const products= category.products

    if (productId) {
        const index= products.findIndex((m) => m.id === productId)
        products.splice(index, 1)
    }

    return (
        <section className={cn(helveticaLight.className, "fondo-cheers relative w-full h-screen pt-20 text-white flex flex-col items-center gap-10 text-center bg-cover")} >

            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="z-0 py-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl">INSUMOS PARA {category.rubroName.toUpperCase() + ": "} <span className="text-white">{category.name.toUpperCase()}</span></h1>
            </div>

            <div className="bg-jomi-gris w-full flex z-0 flex-col items-center gap-20 text-black text-left pt-10">
                {
                    product &&
                    <ProductCard id={productId} 
                    title={product.name} 
                    description={product.description} 
                    image={product.images[0].url}
                    href={product.link}
                    />
                }
                {
                    products.length > 0 ?
                    <>
                                    <SliderProducts products={products} maxItems={4}/>
                                    <SliderProducts products={products} maxItems={2}/>
                    </>
                    :
                    <p className="text-2xl font-bold mt-10">No hay productos en este categoría</p>
                }
                <Footer />
            </div>            
        </section>

    )
}
