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
import {
  SelectContent,
  SelectValue,
  Select,
  SelectTrigger,
  SelectItem,
} from "~/components/ui/select";
import { createFlightFormSchema } from "~/lib/types";
import { createFlightAction } from "./createFlightAction";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const CreateFlight = () => {
  const form = useForm<z.infer<typeof createFlightFormSchema>>({
    mode: "all",
    resolver: zodResolver(createFlightFormSchema),
    defaultValues: {
      airplaneIdNum: 1,
      price: "100",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8" variant="outline">
            Create Flight
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Flight</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              action={createFlightAction}
              className="m-2 flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="airplaneIdNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Airplane ID</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                name="arrivalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="departureTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    disabled={
                      createFlightFormSchema.safeParse(form.getValues())
                        .success === false
                    }
                    type="submit"
                    className="col-span-4"
                  >
                    Create Flight
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFlight;
