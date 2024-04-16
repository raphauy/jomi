import * as z from "zod"
import { prisma } from "@/lib/db"
import { ImageDAO } from "./image-services"

export type ProductDAO = {
  id:  string
	name:  string
	description:  string
  link: string | undefined
	createdAt:  Date
	updatedAt:  Date
	categoryId:  string
  categoryName: string
  images: ImageDAO[]
}

export const productFormSchema = z.object({
	name: z.string({required_error: "Name is required."}),
	description: z.string({required_error: "Description is required."}),
  link: z.string().optional(),
	categoryId: z.string({required_error: "CategoryId is required."}),
  images: z.object({ url: z.string() }).array(),
})
export type ProductFormValues = z.infer<typeof productFormSchema>

export async function getProductsDAO() {
  const found = await prisma.product.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      category: true,
      images: true
    }
  })
  const res = found.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      link: product.link,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      categoryId: product.categoryId,
      categoryName: product.category?.name,
      images: product.images
    }
  })
  return res as ProductDAO[]
}
  
export async function getProductDAO(id: string) {
  const found = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      category: true,
      images: true
    }
  })
  if (!found) {
    return null
  }
  const res = {
    id: found.id,
    name: found.name,
    description: found.description,
    link: found.link,
    createdAt: found.createdAt,
    updatedAt: found.updatedAt,
    categoryId: found.categoryId,
    categoryName: found.category?.name,
    images: found.images
  }
  return res as ProductDAO
}
    
export async function createProduct(data: ProductFormValues) {
  if (data.images.length === 0) {
    throw new Error("el producto debe tener al menos una imágen.")
  }

  const created = await prisma.product.create({
    data: {
      ...data,
      images: {
        create: data.images.map((image) => ({
          url: image.url
        }))
      }
    }
  })
  return created
}

export async function updateProduct(id: string, data: ProductFormValues) {
  
  await prisma.product.update({
    where: {
      id
    },
    data: {
      name: data.name,
      description: data.description,
      link: data.link,
      categoryId: data.categoryId,
      images: {
        deleteMany: {},
      },
    },
  });

  const updated= await prisma.product.update({
    where: {
      id
    },
    data: {
      images: {
        createMany: {
          data: [
            ...data.images.map((image: { url: string }) => image),
          ],
        },
      },
    },
  })

  return updated
}

export async function deleteProduct(id: string) {
  const deleted = await prisma.product.delete({
    where: {
      id
    },
  })
  return deleted
}
    