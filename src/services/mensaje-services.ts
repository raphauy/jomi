import * as z from "zod"
import { prisma } from "@/lib/db"
import { sendEmail } from "@/lib/send-email"
import { MensajeFormValues } from "@/app/admin/mensajes/mensaje-forms"

export type MensajeDAO = {
  id:  string
	nombre?:  string
	email:  string
	contenido:  string
	createdAt:  Date
	updatedAt:  Date
}

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

  const from= process.env.EMAIL_FROM || "JOMI Web Page <webserver@tinta.wine>"
  const to= process.env.EMAIL_TO || "rapha@tinta.wine"
  const subject= "Mensaje desde la web de JOMI"
  const text= `
Nombre: ${data.nombre}
Email: ${data.email}

Mensaje: ${data.contenido}
`
  await sendEmail(from, to, subject, text)

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
    
