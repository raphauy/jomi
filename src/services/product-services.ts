import * as z from "zod"
import { prisma } from "@/lib/db"

export type ProductDAO = {
  id:  string
	name:  string
	description:  string
	createdAt:  Date
	updatedAt:  Date
	categoryId:  string
}

export const productFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string({required_error: "Description is required."}),
	categoryId: z.string({required_error: "CategoryId is required."}),
})
export type ProductFormValues = z.infer<typeof productFormSchema>

export async function getProductsDAO() {
  const found = await prisma.product.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as ProductDAO[]
}
  
export async function getProductDAO(id: string) {
  const found = await prisma.product.findUnique({
    where: {
      id
    },
  })
  return found as ProductDAO
}
    
export async function createProduct(data: ProductFormValues) {
  const created = await prisma.product.create({
    data
  })
  return created
}

export async function updateProduct(id: string, data: ProductFormValues) {
  const updated = await prisma.product.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteProduct(id: string) {
  const deleted = await prisma.product.delete({
    where: {
      id
    },
  })
  return deleted
}
    