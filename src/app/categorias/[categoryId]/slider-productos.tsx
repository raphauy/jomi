"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductDAO } from "@/services/product-services";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    products: ProductDAO[]
    maxItems: number
}

export default function SliderProducts({ products, maxItems }: Props) {

    const [current, setCurrent] = useState(0)
    const [currentProducts, setCurrentProducts] = useState<ProductDAO[]>([])

    useEffect(() => {
        setCurrentProducts(products.slice(current, current + maxItems))
    }
    , [current, products, maxItems])

    function onPreviousClick() {
        
        if ( current > 0 ) {
            const newCurrent= current - 1
            setCurrent(newCurrent)
            setCurrentProducts(products.slice(newCurrent, newCurrent + maxItems))
        }
            
    }

    function onNextClick() {
        if ( current < products.length - 1) {
            const newCurrent= current + 1
            setCurrent(newCurrent)
            setCurrentProducts(products.slice(newCurrent, newCurrent + maxItems))
        }

    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.5,
            }
        },
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 2 }},
    };

    console.log(products)
    

    return (
        <section className={cn("hidden flex-col items-center justify-center mb-1", maxItems === 4 && "md:flex", maxItems === 2 && "flex md:hidden")}>
            <div className="w-full flex items-center gap-1">
                <Button size="sm" onClick={onPreviousClick} disabled={current === 0}>
                    <ChevronLeft className="" />
                </Button>
                    
                <motion.div 
                    key={current}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex gap-4 px-4 bg-white border p-2 border-gray-300 rounded-lg ">
                    {
                        currentProducts.map((product, index) => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <Link key={product.id} href={`/categorias/${product.categoryId}?productId=${product.id}`}  
                                    className={cn("relative h-60 w-60")} 
                                >
                                    <Image
                                        src={product.images[0].url}
                                        alt={product.name}
                                        width={240}
                                        height={240}
                                        className="border rounded-xl object-cover"
                                    />
                                    <p className=" text-gray-700 font-bold text-center mt-3">{product.name}</p>
                                </Link>
                            </motion.div>
                    ))
                    }
                </motion.div>
                <Button size="sm" onClick={onNextClick} disabled={current === products.length - maxItems}>
                    <ChevronRight className="" />
                </Button>
            </div>
        </section>
    )
}
