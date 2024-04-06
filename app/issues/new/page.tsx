"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import {z} from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;


const newIssuesPage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit , formState : {errors}} = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
  });
  const router = useRouter();

  return (
    <div className="max-w-xl">
      {
        error && <Callout.Root color="red" className="mb-5">
        <Callout.Icon>
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      }
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.log("error", error);
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
        

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default newIssuesPage;
