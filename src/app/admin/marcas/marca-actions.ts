"use server"

import { revalidatePath } from "next/cache"
import { MarcaDAO, MarcaFormValues, createMarca, updateMarca, getMarcaDAO, deleteMarca } from "@/services/marca-services"

export async function getMarcaDAOAction(id: string): Promise<MarcaDAO | null> {
  return getMarcaDAO(id)
}

export async function createOrUpdateMarcaAction(id: string | null, data: MarcaFormValues): Promise<MarcaDAO | null> {       
  let updated= null
  if (id) {
      updated= await updateMarca(id, data)
  } else {
      updated= await createMarca(data)
  }     

  revalidatePath("/admin/marcas")

  return updated as MarcaDAO
}

export async function deleteMarcaAction(id: string): Promise<MarcaDAO | null> {    
  const deleted= await deleteMarca(id)

  revalidatePath("/admin/marcas")

  return deleted as MarcaDAO
}
