import * as z from "zod"
import { prisma } from "@/lib/db"

export type MensajeDAO = {
  id:  string
	nombre?:  string
	email:  string
	contenido:  string
	createdAt:  Date
	updatedAt:  Date
}

export const mensajeFormSchema = z.object({
	nombre: z.string().optional(),
	email: z.string({required_error: "Email is required."}),
	contenido: z.string({required_error: "Contenido is required."}),
})
export type MensajeFormValues = z.infer<typeof mensajeFormSchema>

export async function getMensajesDAO() {
  const found = await prisma.mensaje.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as MensajeDAO[]
}
  
export async function getMensajeDAO(id: string) {
  const found = await prisma.mensaje.findUnique({
    where: {
      id
    },
  })
  return found as MensajeDAO
}
    
export async function createMensaje(data: MensajeFormValues) {
  const created = await prisma.mensaje.create({
    data
  })
  return created
}

export async function updateMensaje(id: string, data: MensajeFormValues) {
  const updated = await prisma.mensaje.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteMensaje(id: string) {
  const deleted = await prisma.mensaje.delete({
    where: {
      id
    },
  })
  return deleted
}
    