"use client";

import {
  useFieldEmail,
  useFieldEmailTypo,
  useFieldIsRequired,
  useFieldMinLength,
  useFieldTextWordCount,
} from "@/hooks/use-form-validation";
import { useFormContext } from "react-hook-form";

export type FormContactSchema = {
  name: string;
  email: string;
  content: string;
};

export function ContactFieldset({
  disabled = false,
  readOnly = false,
  className,
  ...props
}: React.ComponentProps<"fieldset"> & { readOnly?: boolean }) {
  const form = useFormContext<FormContactSchema>();

  const required = useFieldIsRequired();
  const words_2 = useFieldTextWordCount(2);
  const email = useFieldEmail();
  const email_typo = useFieldEmailTypo();
  const min_length = useFieldMinLength(2);

  return (
    <fieldset disabled={disabled} className={className} {...props}>
      <div className="flex flex-col justify-end gap-0.5">
        <input
          type="text"
          className="input"
          placeholder="Nombre"
          {...form.register("name", { required, minLength: min_length })}
        />

        {form?.["formState"]?.["errors"]?.["name"] && (
          <p className="text-red-500 text-xs">
            {form?.["formState"]?.["errors"]?.["name"]?.["message"]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <input
          type="email"
          className="input"
          placeholder="Correo electrónico"
          {...form.register("email", {
            required,
            pattern: email,
            validate: email_typo,
          })}
        />

        {form?.["formState"]?.["errors"]?.["email"] && (
          <p className="text-red-500 text-xs">
            {form?.["formState"]?.["errors"]?.["email"]?.["message"]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <textarea
          rows={5}
          className="input resize-none"
          placeholder="Mensaje"
          {...form.register("content", {
            required,
            validate: words_2,
            minLength: min_length,
          })}
        />

        {form?.["formState"]?.["errors"]?.["content"] && (
          <p className="text-red-500 text-xs">
            {form?.["formState"]?.["errors"]?.["content"]?.["message"]}
          </p>
        )}
      </div>
    </fieldset>
  );
}
