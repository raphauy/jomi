"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  deleteCategoryAction,
  createOrUpdateCategoryAction,
  getCategoryDAOAction,
  getRubrosDAOAction,
} from "./category-actions";
import {
  categoryFormSchema,
  CategoryFormValues,
} from "@/services/category-services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { RubroDAO } from "@/services/rubro-services";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  id?: string;
  closeDialog: () => void;
};

export function CategoryForm({ id, closeDialog }: Props) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [rubros, setRubros] = useState<RubroDAO[]>([])
  const [defaultValue, setDefaultValue] = useState("default")

  const onSubmit = async (data: CategoryFormValues) => {
    setLoading(true);
    try {
      await createOrUpdateCategoryAction(id ? id : null, data);
      toast({ title: id ? "Category updated" : "Category created" });
      closeDialog();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRubrosDAOAction()
    .then((data) => {
      setRubros(data)
      toast({ title: "Rubros loaded" });
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    })
  }, [])
  

  useEffect(() => {
    if (id) {
      getCategoryDAOAction(id).then((data) => {
        if (data) {
          setDefaultValue(data.rubroName)
          form.reset(data)
        }
        Object.keys(form.getValues()).forEach((key: any) => {
          if (form.getValues(key) === null) {
            form.setValue(key, "")
          }
        });
      });
    }
  }, [form, id]);

  return (
    <div className="p-4 bg-white rounded-md">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
        control={form.control}
        name="rubroId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rubro</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <FormControl>
                <SelectTrigger>
                  {
                    id ? 
                    <SelectValue className="text-muted-foreground">{rubros.find(rubro => rubro.id === field.value)?.name}</SelectValue> :
                    <SelectValue className="text-muted-foreground" placeholder="Selecciona un Rubro"/>
                  }
                  
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {rubros.map(rubro => (
                  <SelectItem key={rubro.id} value={rubro.id}>{rubro.name}</SelectItem>
                ))
                }
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category's name" {...field} />
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
                  <Input placeholder="Category's description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Category's image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              onClick={() => closeDialog()}
              type="button"
              variant={"secondary"}
              className="w-32"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-32 ml-2">
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function DeleteCategoryForm({ id, closeDialog }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!id) return;
    setLoading(true);
    deleteCategoryAction(id)
      .then(() => {
        toast({ title: "Category deleted" });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
        closeDialog && closeDialog();
      });
  }

  return (
    <div>
      <Button
        onClick={() => closeDialog && closeDialog()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancelar
      </Button>
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="w-32 ml-2 gap-1"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        Delete
      </Button>
    </div>
  );
}
