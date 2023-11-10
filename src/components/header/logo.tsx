"use client";

import Image from "next/image";
import Link from "next/link";


export default function Logo() {

  return (
    <Link href="/">
      <div className="flex flex-col items-center">
        <Image src="/Jomi_logoweb.png" alt="Logo de JOMI" width={150} height={100} />
      </div>
    </Link>
  )
}
