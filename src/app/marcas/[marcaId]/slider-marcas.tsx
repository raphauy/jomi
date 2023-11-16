"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarcaDAO } from "@/services/marca-services";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    marcas: MarcaDAO[]
    maxItems: number
}

export default function SliderComponent({ marcas, maxItems }: Props) {

    const [current, setCurrent] = useState(0)
    const [currentMarcas, setCurrentMarcas] = useState<MarcaDAO[]>([])

    useEffect(() => {
        setCurrentMarcas(marcas.slice(current, current + maxItems))
    }
    , [current, marcas, maxItems])

    function onPreviousClick() {
        
        if ( current > 0 ) {
            const newCurrent= current - 1
            setCurrent(newCurrent)
            setCurrentMarcas(marcas.slice(newCurrent, newCurrent + maxItems))
        }
            
    }

    function onNextClick() {
        if ( current < marcas.length - 1) {
            const newCurrent= current + 1
            setCurrent(newCurrent)
            setCurrentMarcas(marcas.slice(newCurrent, newCurrent + maxItems))
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
                        currentMarcas.map((marca, index) => (
                            <motion.div key={marca.id} variants={itemVariants}>
                                <Link key={marca.id} href={`/marcas/${marca.id}`} 
                                    className={cn("flex relative h-40 w-40 items-center justify-center")}
                                >
                                    <Image
                                        src={`/logos/${marca.image}`}
                                        alt={marca.name}
                                        width={160}
                                        height={160}
                                        className="border  rounded-xl object-cover"
                                    />
                                </Link>
                            </motion.div>
                    ))
                    }
                </motion.div>
                <Button size="sm" onClick={onNextClick} disabled={current === marcas.length - maxItems}>
                    <ChevronRight className="" />
                </Button>
            </div>
        </section>
    )
}
