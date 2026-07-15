/** biome-ignore-all lint/correctness/noChildrenProp: needed for form field */
"use client";

import { IconAlertCircle } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useState, useTransition } from "react";
import * as z from "zod";
import { login } from "@/app/actions/login";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      setServerError(null);
      startTransition(async () => {
        const result = await login(value);
        // On success the server action redirects; we only get here on failure.
        if (result?.error) {
          setServerError(result.error);
        }
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="a@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="shadow-xs"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  type="password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="shadow-xs"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={pending}
        className="w-full hover:cursor-pointer hover:shadow-md shadow-xs"
      >
        {pending && <Spinner data-icon="inline-start" />}
        {pending ? "Signing in…" : "Submit"}
      </Button>

      {serverError && (
        <Alert variant="destructive" className="max-w-md">
          <IconAlertCircle stroke={2} />
          <AlertTitle>Login failed</AlertTitle>
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
