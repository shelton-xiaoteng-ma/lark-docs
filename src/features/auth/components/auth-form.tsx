"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUp } from "@/lib/auth-service";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GoTriangleRight } from "react-icons/go";
import { z } from "zod";
import { useAuthStateStore } from "../store/use-auth-state-store";

interface AuthFormProps {
  authType: "sign-up" | "sign-in";
}

export const AuthForm = ({ authType }: AuthFormProps) => {
  const { loading, setLoading } = useAuthStateStore();
  const router = useRouter();

  // Define form
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.error) {
        alert("Failed to sign in. Please check your credentials.");
      } else if (res?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Define onSignUp function to handle form submission
  const onSignUp = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      const res = await signUp({
        email: values.email,
        password: values.password,
      });
      if (res?.error) {
        alert("Failed to sign up. Please try again.");
      } else if (res?.data) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          authType === "sign-in" ? onSignIn : onSignUp
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel />
              <FormDescription className="text-black">
                Email address
              </FormDescription>
              <FormControl>
                <input
                  onChange={onChange}
                  value={value}
                  placeholder="Enter your email address"
                  className="px-4 h-8 w-full text-sm border rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel />
              <FormDescription className="text-black">Password</FormDescription>
              <FormControl>
                <input
                  onChange={onChange}
                  value={value}
                  placeholder="Enter your password"
                  className="px-4 h-8 w-full text-sm border rounded-md"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full h-8 bg-gray-800 rounded-md"
          type="submit"
          disabled={loading}
        >
          Continue <GoTriangleRight />
        </Button>
      </form>
    </Form>
  );
};
