import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import useConversation from "@/hooks/useConversations";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "../ui/button";

const formSchema = z.object({
  content: z.string().min(1).max(250),
  id: z.string().min(1),
});

const MessageInput = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [isLoading, setIdLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      id: selectedConversation?._id || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIdLoading(true);
    await axios
      .post(`/api/message/${selectedConversation?._id}`, {
        content: values.content,
      })
      .then((res) => {
        setMessages([...messages, res.data.results]);
        form.resetField("content");
        setTimeout(() => {
          form.setFocus("content");
        }, 100);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setIdLoading(false));
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <div className="flex items-center  border px-4 rounded-3xl  mt-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Message"
                    {...field}
                    className="block bg-transparent border-transparent border grow placeholder:text-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="w-auto h-auto p-2 rounded-full hover:bg-black/5 "
            variant={"ghost"}
            type="submit"
            disabled={isLoading}
          >
            <Send size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageInput;
