import axios from "axios";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "name is required",
    })
    .max(50),
  userName: z
    .string()
    .min(2, {
      message: "username is required",
    })
    .max(50),
  password: z
    .string()
    .min(6, {
      message: "password must be 6 chars at least",
    })
    .max(50),
  gender: z.enum(["Male", "Female"]),
});

const SignUpForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      password: "",
      gender: "Male",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    await axios
      .post("/api/auth/signup", values)
      .then(() => {
        navigate("/login");
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
        <h2 className="font-semibold text-3xl text-center">Sign Up</h2>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Fullname"
                  {...field}
                  className="bg-transparent border-neutral-400 placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Username"
                  {...field}
                  className="bg-transparent border-neutral-400 placeholder:text-white"
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
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center"
                >
                  <Label htmlFor="option-one">Gender: </Label>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Male"
                      id="option-one"
                      className="border-neutral-400"
                    />
                    <Label htmlFor="option-one">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Female"
                      id="option-two"
                      className="border-neutral-400"
                    />
                    <Label htmlFor="option-two">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm">
          Aleady Have account ?{" "}
          <Link to={"/login"} className="underline">
            Login
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

export default SignUpForm;
