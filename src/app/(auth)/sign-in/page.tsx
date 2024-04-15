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
import { SignInFormSchema } from "~/lib/types";
import { useForm } from "react-hook-form";
import { signin } from "~/server/auth/signin";

export default function SignInPage() {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "all",
    resolver: zodResolver(SignInFormSchema),
  });

  return (
    <Form {...form}>
      <form action={signin} className="m-2 max-w-lg space-y-2">
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
          Sign In
        </Button>
      </form>
    </Form>
  );
}
