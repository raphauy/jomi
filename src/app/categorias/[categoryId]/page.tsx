import { getCategoryDAO } from "@/services/category-services"

type Props = {
    params: {
        categoryId: string
    }
}

export default async function ProductPage({ params }: Props) {
    const category= await getCategoryDAO(params.categoryId)

    return (
        <div>
            <p>Category: {category.name}</p>
        </div>
    )
}
