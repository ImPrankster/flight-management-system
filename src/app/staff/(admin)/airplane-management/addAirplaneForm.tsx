"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { airplaneFormSchema } from "~/lib/types";
import { addAirplaneFormAction } from "./addAirplaneFormAction";

const AddAirplaneForm = () => {
  const form = useForm<z.infer<typeof airplaneFormSchema>>({
    mode: "all",
    resolver: zodResolver(airplaneFormSchema),
  });

  return (
    <Form {...form}>
      <form action={addAirplaneFormAction} className="m-2 flex flex-col gap-4">
        <FormField
          control={form.control}
          name="seatsAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seat Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            airplaneFormSchema.safeParse(form.getValues()).success === false
          }
          type="submit"
        >
          Add Airplane
        </Button>
      </form>
    </Form>
  );
};

export default AddAirplaneForm;
