"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer, z } from "zod";
import {signIn} from "next-auth/react"
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

export default function SigninForm() {
  const formSchema = z.object({
    email: z.string().email({ message: "Email is not valid" }),
    password: z
      .string()
      .min(2, { message: "Password must be atleast 2 charactwers" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
        const result = await signIn('credentials',{
            redirect: false,
            email : data.email,
            password : data.password,
        })
    
        if(result?.error){
            return toast({
                title : "Sign in Unsuccessful",
                description : result.error,
                variant:"destructive",
            })
        }
    
        toast({
            title : "Sign in Successful",
        })
    
        router.push('/dashboard')
    }catch(error : any){
        return toast({
            title : "Sign in Unsuccessful",
            description : "Something went wrong",
            variant:"destructive",
        })
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
