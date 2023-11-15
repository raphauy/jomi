"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CategoryDAO } from "@/services/category-services";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    categorias: CategoryDAO[]
}

export default function SliderCategorias({ categorias }: Props) {

    const [current, setCurrent] = useState(0)
    const [currentCategorias, setCurrentCategorias] = useState<CategoryDAO[]>([])

    // const [max, setMax] = useState(window.innerWidth <= 800 ? 2 : 3);

    const max= 3
    // useEffect(() => {
    //     const handleResize = () => {
    //         setMax(window.innerWidth <= 800 ? 2 : 3);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    useEffect(() => {
        setCurrentCategorias(categorias.slice(current, current + max))
    }
    , [current, categorias, max])

    function onPreviousClick() {
        
        if ( current > 0 ) {
            const newCurrent= current - 1
            setCurrent(newCurrent)
            setCurrentCategorias(categorias.slice(newCurrent, newCurrent + max))
        }
            
    }

    function onNextClick() {
        if ( current < categorias.length - 1) {
            const newCurrent= current + 1
            setCurrent(newCurrent)
            setCurrentCategorias(categorias.slice(newCurrent, newCurrent + max))
        }

    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.4,
            }
        },
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1 }},
    };
    
    return (
        <section className="flex items-center justify-center mb-1  w-full">
            <div className="w-full flex items-center justify-center gap-1 z-20 bg-jomi-gris">
                <Button size="sm" onClick={onPreviousClick} 
                    disabled={current === 0} 
                    variant="ghost" className="text-gray-500">                    
                    <ChevronLeft className="" />
                </Button>
                    
                <motion.div 
                    key={current}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex gap-4 px-4 border p-2  rounded-lg ">
                    {
                        currentCategorias.map((categoria, index) => (
                            <motion.div key={categoria.id} variants={itemVariants}>
                                <div key={categoria.id}
                                    className={cn("flex relative h-80 w-40 items-center justify-center")}
                                >
                                    <Image
                                        src={`/categorias/${categoria.name.toLowerCase()}/${categoria.image}`}
                                        alt={categoria.name}
                                        width={320}
                                        height={320}
                                        className="border bg-white h-60 rounded-xl object-cover"
                                    />
                                </div>
                            </motion.div>
                    ))
                    }
                </motion.div>
                <Button size="sm" onClick={onNextClick} 
                    disabled={current === categorias.length - max} 
                    variant="ghost" className="text-gray-500">
                    <ChevronRight className="" />
                </Button>
            </div>
        </section>
    )
}
