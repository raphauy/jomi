import * as z from "zod"
import { prisma } from "@/lib/db"

export type MarcaDAO = {
  id:  string
	name:  string
	description?:  string
	href?:  string
	createdAt:  Date
	updatedAt:  Date
}

export const marcaFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string().nullable(),
	href: z.string().nullable(),
})
export type MarcaFormValues = z.infer<typeof marcaFormSchema>

export async function getMarcasDAO() {
  const found = await prisma.marca.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as MarcaDAO[]
}
  
export async function getMarcaDAO(id: string) {
  const found = await prisma.marca.findUnique({
    where: {
      id
    },
  })
  return found as MarcaDAO
}
    
export async function createMarca(data: MarcaFormValues) {
  const created = await prisma.marca.create({
    data
  })
  return created
}

export async function updateMarca(id: string, data: MarcaFormValues) {
  const updated = await prisma.marca.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteMarca(id: string) {
  const deleted = await prisma.marca.delete({
    where: {
      id
    },
  })
  return deleted
}
    