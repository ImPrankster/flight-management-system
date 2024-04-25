"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import FlightsTable from "~/components/flightsTable";
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
import { searchFlightsFormSchema } from "~/lib/types";
import { type flight } from "~/server/db/schema";

const SearchPage = () => {
  const form = useForm<z.infer<typeof searchFlightsFormSchema>>({
    resolver: zodResolver(searchFlightsFormSchema),
  });

  const [data, setData] = useState<InferSelectModel<typeof flight>[]>([]);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Search Flights
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (param) => {
            toast("Searching...");

            const data: InferSelectModel<typeof flight>[] = (await fetch(
              "/ticketing/search/api",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(param),
              },
            ).then((res) => res.json())) as InferSelectModel<typeof flight>[];

            setData(data);
          })}
          className="grid grid-flow-col justify-stretch gap-4 p-4"
        >
          <FormField
            control={form.control}
            name="departureAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Airport</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrivalAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Airport</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">
            Search
          </Button>
        </form>
      </Form>
      <h3 className="ml-4 scroll-m-20 text-xl font-semibold tracking-tight">
        Result:
      </h3>
      <FlightsTable data={data} />
    </main>
  );
};

export default SearchPage;
