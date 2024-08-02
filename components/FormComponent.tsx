"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Start typing your story!",
  }),
});

interface FormComponentProps {
  setResult: (value: string) => void;
  setDraft: (value: string) => void;
  setShow: (value: boolean) => void;
  setShowResult: (value: boolean) => void;
}

export function FormComponent(props: FormComponentProps) {
  const { setResult, setDraft, setShow, setShowResult } = props; // Destructure props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.username);
    setResult(values.username);
    setShowResult(true);
    setShow(true);
    setSearchTerm(""); // Clear searchTerm on submit
  }

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (searchTerm) {
      timeoutId = setTimeout(() => {
        setDraft(searchTerm);
        setSearchTerm("");
        form.setValue("username", "");
        setShow(true);
      }, 30000); // 10 seconds inactivity
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, setDraft, setShow, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-4/6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Type your story here!"
                  {...field}
                  value={searchTerm}
                  onChange={(e) => {
                    field.onChange(e);
                    setSearchTerm(e.target.value);
                  }}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex mx-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
