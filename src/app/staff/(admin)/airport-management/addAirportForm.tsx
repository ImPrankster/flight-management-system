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
import { airportFormSchema } from "~/lib/types";
import { addAirportForm } from "./addAirportFormAction";

const AddAirportForm = () => {
  const form = useForm<z.infer<typeof airportFormSchema>>({
    mode: "all",
    resolver: zodResolver(airportFormSchema),
  });

  return (
    <Form {...form}>
      <form action={addAirportForm} className="m-2 flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Airport Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            airportFormSchema.safeParse(form.getValues()).success === false
          }
          type="submit"
        >
          Add Airport
        </Button>
      </form>
    </Form>
  );
};

export default AddAirportForm;
