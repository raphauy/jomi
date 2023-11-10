import { ReactNode } from "react"
import Logged from "./logged"
import Logo from "./logo"

interface Props {  
    children: ReactNode
}
  
export default async function Header({ children }: Props) {

    return (
        <div className="hidden md:flex px-0 sm:px-2 md:px-3 text-gray-50 bg-black items-center gap-2 pb-1">
            <div>
                <Logo />
            </div>

            <div className="flex-1">                                
                {children}
            </div>
            
            {/* <div>
                <Logged />
            </div> */}
        </div>
    )
}
