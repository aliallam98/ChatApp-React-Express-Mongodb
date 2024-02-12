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
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import useConversation from "@/hooks/useConversations";


const formSchema = z.object({
  searchTerm: z.string(),
});

const SearchInput = () => {
  const { conversations, setFilteredConversations } = useConversation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const filter = conversations.filter((c) =>
      c.userName.includes(values.searchTerm)
    );
    setFilteredConversations(filter);
    if (values.searchTerm === "") {
      setFilteredConversations(conversations);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <div className="flex items-center border px-4 rounded-3xl">
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    placeholder="Search"
                    {...field}
                    className="bg-transparent border-transparent placeholder:text-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="w-auto h-auto p-2 rounded-full hover:bg-black/5"
            variant={"ghost"}
            type="submit"
          >
            <Search size={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchInput;
