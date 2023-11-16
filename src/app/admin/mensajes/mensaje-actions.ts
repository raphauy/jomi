"use server"

import { MensajeDAO, createMensaje, deleteMensaje, getMensajeDAO, updateMensaje } from "@/services/mensaje-services"
import { revalidatePath } from "next/cache"
import { MensajeFormValues } from "./mensaje-forms"


export async function getMensajeDAOAction(id: string): Promise<MensajeDAO | null> {
  return getMensajeDAO(id)
}

export async function createOrUpdateMensajeAction(id: string | null, data: MensajeFormValues): Promise<MensajeDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateMensaje(id, data)
  } else {
      updated= await createMensaje(data)
  }     

  revalidatePath("/")

  return updated as MensajeDAO
}

export async function deleteMensajeAction(id: string): Promise<MensajeDAO | null> {    
  const deleted= await deleteMensaje(id)

  revalidatePath("/")

  return deleted as MensajeDAO
}
