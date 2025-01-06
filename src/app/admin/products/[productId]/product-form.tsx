"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/image-upload"
import { ProductDAO, ProductFormValues, productFormSchema } from "@/services/product-services"
import { ImageDAO } from "@/services/image-services"
import { CategoryDAO } from "@/services/category-services"
import { toast } from "@/components/ui/use-toast"
import { DeleteProductDialog } from "../product-dialogs"
import { createProductAction, updateProductAction } from "../product-actions"
import { Textarea } from "@/components/ui/textarea"


interface ProductFormProps {
  initialData: ProductDAO | null;
  categories: CategoryDAO[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    description: '',
    link: '',
    images: [],
    categoryId: '',
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateProductAction(initialData.id, data)
      } else {
        await createProductAction(data)
      }
      toast({ title: toastMessage })        
      router.push(`/admin/products`);
    } catch (error: any) {
      toast({ title: "Algo salió mal!", description: error.message, variant: "destructive"})
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      // router.refresh();
      // router.push(`/${params.storeId}/products`);
      // toast.success('Product deleted.');
    } catch (error: any) {
      toast({ title: "Algo salió mal!", variant: "destructive"})
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  function handleImageChange(url: string) {
    console.log(url)
    form.setValue('images', [...form.getValues('images'), { url }])
  }

  return (
    <>
     <div className="flex items-center justify-between">
      <div>
        <p className="font-bold text-3xl">{title}</p>
        <p className="text-lg">{description}</p> 
      </div>

        {initialData && (
          <DeleteProductDialog id={initialData.id} description={`Seguro que deseas eliminar el producto ${initialData.name}`} />
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-white p-2 border rounded-md">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value.map((image) => image.url)} 
                    disabled={loading} 
                    onChange={handleImageChange}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-2 gap-8 space-y-4">
          <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p></p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product's link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={8} placeholder="Product's description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
