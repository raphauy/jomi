
import { getCurrentUser } from "@/lib/auth";
import { getCategorysDAO } from "@/services/category-services";
import { getMarcasDAO } from "@/services/marca-services";
import MenuAdmin from "./menu-admin";
import { MenuType, publicMenu } from "./menu-data";
import MenuComponent from "./menu-item";

export default async function Menu() {
    
    const user= await getCurrentUser()

    const categoriesMenu= await getCategoriesMenu()
    const productsMenuIndex= publicMenu.findIndex(menu => menu.key === 'productos')
    if (productsMenuIndex === -1) {
        publicMenu.splice(2, 0, categoriesMenu)
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

async function getCategoriesMenu() {
    
    const categories= await getCategorysDAO()
    const categoriesSubMenus= categories.map(({ id, name, description }) => ({
        key: name,
        description,
        href: `/products/${id}`
    }))
    const productsMenu: MenuType= {
        key: 'productos',
        href: '/admin/products',
        subMenu: categoriesSubMenus,
    }

    return productsMenu
}

async function getBrandsMenu() {
        
    const brands= await getMarcasDAO()
    const subMenus= brands.map(({ name, description, href }) => ({
        key: name,
        description,
        href: href || "#",
    }))
    const productsMenu: MenuType= {
        key: 'marcas',
        href: '/admin/marcas',
        subMenu: subMenus,
    }

    return productsMenu
}
