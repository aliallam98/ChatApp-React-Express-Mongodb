import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

const formSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "username is required",
    })
    .max(50),
  password: z
    .string()
    .min(2, {
      message: "password is required",
    })
    .max(50),
});

const LoginForm = () => {
  const { setAuthUser } = useAuthContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post("/api/auth/login", values)
      .then((res) => {
        const payload = res.data.results;
        localStorage.setItem("auth-user", JSON.stringify(payload));
        setAuthUser(payload);
        navigate("/");
      })
      .catch((res) => toast.error(res.response.data.message))
      .finally(() => setIsPending(false));
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8  max-w-md w-full  bg-white/20 p-4 rounded-3xl text-white  backdrop-blur-sm"
      >
        <h2 className="font-semibold text-3xl text-center">Login</h2>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="bg-transparent border-neutral-400 placeholder:text-white"
                  disabled={isPending}
                />
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
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Password"
                  {...field}
                  type="password"
                  className="bg-transparent border-neutral-400 placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm">
          Dont Have Account ?{" "}
          <Link to={"/signup"} className="underline">
            Signup
          </Link>
        </p>
        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-white/60 hover:bg-white/30 transition"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
