import { getCategorysDAO } from "@/services/category-services"
import { Icon } from "../shadcn/icons"

export interface MenuType {
    key: string
    href: string
    description?: string
    icon?: string
    subMenu?: MenuType[]    
}

export const publicMenu: MenuType[]= [
        {
            key: 'inicio',
            href: '/',
        },
        {
            key: 'quiénes somos',
            href: '/#quienes-somos',
        },
        // { 
        //     key: 'productos',
        //     href: '/products',
        //     subMenu: [
        //         {
        //             key: 'service1',
        //             href: '/service1',
        //             description: 'Service 1 description'
        //         },
        //         {
        //             key: 'service2',
        //             href: '/service2',
        //             description: 'Service 2 description'
        //         },
        //         {
        //             key: 'service3',
        //             href: '/service3',
        //             description: 'Service 3 description'
        //         },
        //     ]
        // },
        {
            key: 'contacto',
            href: '/contacto',
        },
        ]
