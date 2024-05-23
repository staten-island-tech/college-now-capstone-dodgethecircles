import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import * as F from "@/components/ui/form";

const loginFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
const registerFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

async function onSubmit(
  values: z.infer<typeof loginFormSchema> | z.infer<typeof registerFormSchema>
) {
  const res = await fetch(
    //@ts-ignore
    process.env.BACKEND_URL + values.confirmPassword === null
      ? "/login"
      : "/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
}

export default function login() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Tabs defaultValue="login" className="w-full mt-2">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <F.Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <F.FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Username *</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="Username" {...field} />
                  </F.FormControl>
                  <F.FormDescription>
                    This is your public display name.
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <F.FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Password *</F.FormLabel>
                  <F.FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </F.FormControl>
                  <F.FormDescription>Enter a secure password</F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <p className="text-xs font-bold">* required fields</p>
            <Button type="submit">Submit</Button>
          </form>
        </F.Form>
      </TabsContent>
      <TabsContent value="register">
        <F.Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <F.FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Username *</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </F.FormControl>
                  <F.FormDescription>
                    This is your public display name.
                  </F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <F.FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Password *</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </F.FormControl>
                  <F.FormDescription>Enter a secure password</F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <F.FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Confirm Password *</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </F.FormControl>
                  <F.FormDescription>Confirm your password</F.FormDescription>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <p className="text-xs font-bold">* required fields</p>
            <Button type="submit">Submit</Button>
          </form>
        </F.Form>
      </TabsContent>
    </Tabs>
  );
}
