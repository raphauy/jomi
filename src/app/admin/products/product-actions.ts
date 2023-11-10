"use server"

import { revalidatePath } from "next/cache"
import { ProductDAO, ProductFormValues, createProduct, updateProduct, getProductDAO, deleteProduct } from "@/services/product-services"

export async function getProductDAOAction(id: string): Promise<ProductDAO | null> {
  return getProductDAO(id)
}

export async function createOrUpdateProductAction(id: string | null, data: ProductFormValues): Promise<ProductDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateProduct(id, data)
  } else {
      updated= await createProduct(data)
  }     

  revalidatePath("/admin/products")

  return updated as ProductDAO
}

export async function deleteProductAction(id: string): Promise<ProductDAO | null> {    
  const deleted= await deleteProduct(id)

  revalidatePath("/admin/products")

  return deleted as ProductDAO
}
