import * as z from "zod"
import { prisma } from "@/lib/db"

export type CategoryDAO = {
  id: string
	name: string
	description?: string
	image?: string
  rubroId: string
  rubroName: string
}

export const categoryFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string().optional(),
	image: z.string().optional(),
  rubroId: z.string(),
})
export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export async function getCategorysDAO() {
  const found = await prisma.category.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      rubro: true
    }
  })
  const res = found.map((category) => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
      rubroId: category.rubroId,
      rubroName: category.rubro?.name || ""
    }
  })

  return res as CategoryDAO[]
}
  
export async function getCategoryDAO(id: string) {
  const found = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      rubro: true
    }    
  })
  if (!found) {
    return null
  }
  const res = {
    id: found.id,
    name: found.name,
    description: found.description,
    image: found.image,
    rubroId: found.rubroId,
    rubroName: found.rubro?.name || ""
  }

  return res as CategoryDAO
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
    