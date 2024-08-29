"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer, z } from "zod";

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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const formSchema = z.object({
    email: z.string().email({ message: "Email is not valid" }),
    password: z
      .string()
      .min(2, { message: "Password must be atleast 2 charactwers" }),
    name: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/sign-up`, data);

      if (!response.data.success) {
        return toast({
          title: "Signup Failed",
          description: response.data.message,
          variant:"destructive",
        });
      }
      toast({
        title: "Sign Up Successful",
        description: "Redirecting to sign-in page...",
      });

      // Redirect to sign-in page after successful signup
      router.push("/signin");
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      toast({
        title: "Sign Up Failed",
        description:
          error?.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  ">
      <div className="w-[400px] shadow-md p-5">
        <h1 className="font-semibold text-center text-2xl">Welcome to Blogs</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
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
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
