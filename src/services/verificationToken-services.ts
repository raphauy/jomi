import * as z from "zod"
import { prisma } from "@/lib/db"

export type VerificationTokenDAO = {
  identifier:  string
	token:  string
	expires:  Date
	:  any
	@@unique([identifier,:  any
}

export const verificationTokenFormSchema = z.object({
	identifier: z.string({required_error: "Identifier is required."}),
	token: z.string({required_error: "Token is required."}),
})
export type VerificationTokenFormValues = z.infer<typeof verificationTokenFormSchema>

export async function getVerificationTokensDAO() {
  const found = await prisma.verificationtoken.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as VerificationTokenDAO[]
}
  
export async function getVerificationTokenDAO(id: string) {
  const found = await prisma.verificationtoken.findUnique({
    where: {
      id
    },
  })
  return found as VerificationTokenDAO
}
    
export async function createVerificationToken(data: VerificationTokenFormValues) {
  const created = await prisma.verificationtoken.create({
    data
  })
  return created
}

export async function updateVerificationToken(id: string, data: VerificationTokenFormValues) {
  const updated = await prisma.verificationtoken.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteVerificationToken(id: string) {
  const deleted = await prisma.verificationtoken.delete({
    where: {
      id
    },
  })
  return deleted
}
    