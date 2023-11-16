"use server"

import { revalidatePath } from "next/cache"
import { RubroDAO, RubroFormValues, createRubro, updateRubro, getRubroDAO, deleteRubro } from "@/services/rubro-services"

export async function getRubroDAOAction(id: string): Promise<RubroDAO | null> {
  return getRubroDAO(id)
}

export async function createOrUpdateRubroAction(id: string | null, data: RubroFormValues): Promise<RubroDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateRubro(id, data)
  } else {
      updated= await createRubro(data)
  }     

  revalidatePath("/admin/rubros")

  return updated as RubroDAO
}

export async function deleteRubroAction(id: string): Promise<RubroDAO | null> {    
  const deleted= await deleteRubro(id)

  revalidatePath("/admin/rubros")

  return deleted as RubroDAO
}
