import { getProductDAO } from "@/services/product-services"

type Props = {
    params: {
        productId: string
    }
}

export default async function ProductPage({ params }: Props) {
    const product= await getProductDAO(params.productId)

    return (
        <div>
            <p>Product: {product.name}</p>
        </div>
    )
}
