"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  deleteMensajeAction,
  createOrUpdateMensajeAction,
  getMensajeDAOAction,
} from "./mensaje-actions";
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
import { CheckCircle2, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { butlerBlack, helveticaMedium } from "@/lib/fonts";
import { z } from "zod";

export const mensajeFormSchema = z.object({
	nombre: z.string().optional(),
	email: z.string({required_error: "El email es obligatorio."}).email({message: "El email no es válido."}),
	contenido: z.string({required_error: "El Contenido es obligatorio."}),
})
export type MensajeFormValues = z.infer<typeof mensajeFormSchema>

type Props = {
  id?: string;
  closeDialog?: () => void;
};

export function MensajeForm({ id, closeDialog }: Props) {
  const form = useForm<MensajeFormValues>({
    resolver: zodResolver(mensajeFormSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false)

  const onSubmit = async (data: MensajeFormValues) => {
    setLoading(true);
    try {
      await createOrUpdateMensajeAction(id ? id : null, data);
      toast({ title: id ? "Mensaje actualizado" : "Mensaje enviado" });
      closeDialog && closeDialog();
      setEnviado(true)
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
    if (id) {
      getMensajeDAOAction(id).then((data) => {
        if (data) {
          form.reset(data);
        }
        Object.keys(form.getValues()).forEach((key: any) => {
          if (form.getValues(key) === null) {
            form.setValue(key, "");
          }
        });
      });
    }
  }, [form, id]);

  return (
    <div className={cn("p-4")}>
      <div className={cn(butlerBlack.className, "border gap-8 flex flex-col items-center border-gray-500 p-10 h-40 rounded-lg", !enviado && "hidden")}>
        <p className="flex items-center gap-4 text-2xl">Mensaje enviado <CheckCircle2 color="green" /></p>
        <p className={helveticaMedium.className}>Muchas gracias por el contacto!</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 md:min-w-[500px]", enviado && "hidden")}>

          <div className="flex gap-2 w-full">
            <FormField            
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="👤" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="✉️" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <FormField
            control={form.control}
            name="contenido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea placeholder="Escribe tu mensaje aquí" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" className="px-7 mt-4 w-40">
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <p className="whitespace-nowrap">Enviar consulta</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export function DeleteMensajeForm({ id, closeDialog }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!id) return;
    setLoading(true);
    deleteMensajeAction(id)
      .then(() => {
        toast({ title: "Mensaje deleted" });
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
