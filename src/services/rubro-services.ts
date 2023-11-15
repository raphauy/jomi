import * as z from "zod"
import { prisma } from "@/lib/db"

export type RubroDAO = {
  id:  string
	name:  string
	description?:  string
	image?:  string
}

export const rubroFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string().optional(),
	image: z.string().optional(),
})
export type RubroFormValues = z.infer<typeof rubroFormSchema>

export async function getRubrosDAO() {
  const found = await prisma.rubro.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as RubroDAO[]
}
  
export async function getRubroDAO(id: string) {
  const found = await prisma.rubro.findUnique({
    where: {
      id
    },
  })
  return found as RubroDAO
}
    
export async function createRubro(data: RubroFormValues) {
  const created = await prisma.rubro.create({
    data
  })
  return created
}

export async function updateRubro(id: string, data: RubroFormValues) {
  const updated = await prisma.rubro.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteRubro(id: string) {
  const deleted = await prisma.rubro.delete({
    where: {
      id
    },
  })
  return deleted
}
    