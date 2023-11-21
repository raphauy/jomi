
import { getCurrentUser } from "@/lib/auth";
import { getMarcasDAO } from "@/services/marca-services";
import { getRubrosDAO } from "@/services/rubro-services";
import MenuAdmin from "./menu-admin";
import { MenuType, publicMenu } from "./menu-data";
import MenuComponent from "./menu-item";

export default async function Menu() {
    
    const user= await getCurrentUser()

    const rubrosMenu= await getRubrosMenu()
    const productsMenuIndex= publicMenu.findIndex(menu => menu.key === 'productos')
    if (productsMenuIndex === -1) {
        publicMenu.splice(2, 0, rubrosMenu)
    }

    const brandsMenu= await getBrandsMenu()
    const brandsMenuIndex= publicMenu.findIndex(menu => menu.key === 'marcas')
    if (brandsMenuIndex === -1) {
        publicMenu.splice(3, 0, brandsMenu)
    }



    return (
        <div className="flex justify-between items-center">
            <div className="">
                {
                    user?.role === "admin" &&
                    <MenuAdmin />
                }                
            </div>
            
            <div>
                <MenuComponent menu={publicMenu} />
            </div>

            {/* <div>
                <ThemeToggle />
            </div> */}
        </div>
    )
    
}

async function getRubrosMenu() {
    
    const rubros= await getRubrosDAO()
    const rubrosSubMenus= rubros.map(({ id, name, description }) => ({
        key: name,
        description,
        href: `/rubros/${id}`
    }))
    const productsMenu: MenuType= {
        key: 'productos',
        href: `/#productos`,
        subMenu: rubrosSubMenus,
    }

    return productsMenu
}

async function getBrandsMenu() {
        
    const brands= await getMarcasDAO()
    const subMenus= brands.map(({ id, name, description }) => ({
        key: name,
        description,
        href: `/marcas/${id}`
    }))
    const productsMenu: MenuType= {
        key: 'marcas',
        href: '/#marcas',
        subMenu: subMenus,
    }

    return productsMenu
}