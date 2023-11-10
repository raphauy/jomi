import * as z from "zod"
import { prisma } from "@/lib/db"

export type CategoryDAO = {
  id:  string
	name:  string
	description?:  string
	icon?:  string
}

export const categoryFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string().optional(),
	icon: z.string().optional(),
})
export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export async function getCategorysDAO() {
  const found = await prisma.category.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as CategoryDAO[]
}
  
export async function getCategoryDAO(id: string) {
  const found = await prisma.category.findUnique({
    where: {
      id
    },
  })
  return found as CategoryDAO
}
    
export async function createCategory(data: CategoryFormValues) {
  const created = await prisma.category.create({
    data
  })
  return created
}

export async function updateCategory(id: string, data: CategoryFormValues) {
  const updated = await prisma.category.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteCategory(id: string) {
  const deleted = await prisma.category.delete({
    where: {
      id
    },
  })
  return deleted
}
    