"use client";

import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { SignUpFormSchema } from "~/lib/types";
import { signup } from "~/server/auth/signup";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  return (
    <main className="flex min-h-screen w-full flex-col place-content-center p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Create an account
      </h1>
      <Form {...form}>
        <form action={signup} className="m-2 max-w-lg space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={Object.keys(form.formState.errors).length != 0}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
