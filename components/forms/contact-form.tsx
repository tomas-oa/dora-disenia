"use client";

import { clsx } from "clsx";
import { FormProvider, useForm } from "react-hook-form";

import { sendEmail } from "@/app/actions";
import {
  ContactFieldset,
  type FormContactSchema,
} from "@/components/forms/contact-fieldset";
import { IconEmailSended, IconSpinner } from "@/components/icons";
import posthog from "posthog-js";

const FORM_CONTACT_DEFAULT_VALUES: FormContactSchema = {
  name: "",
  email: "",
  content: "",
};

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<FormContactSchema>({
    defaultValues: FORM_CONTACT_DEFAULT_VALUES,
  });
  const { isSubmitting, isSubmitSuccessful } = form["formState"];

  const handleValidSubmit = form.handleSubmit(async (data) => {
    posthog.capture("contact_form_submitted", {
      name: data["name"],
      email: data["email"],
      content: data["content"],
    });

    const result = await sendEmail(data);

    if (!result.success) {
      console.error(result.error);
      return;
    }

    form.reset(FORM_CONTACT_DEFAULT_VALUES);
  });

  return (
    <form
      onSubmit={handleValidSubmit}
      className={clsx("flex flex-col gap-4", className)}
      {...props}
    >
      <FormProvider {...form}>
        <ContactFieldset
          readOnly={isSubmitting}
          disabled={isSubmitting}
          className={clsx("grid grid-cols-1 gap-2")}
        />

        <div
          className={clsx(
            "flex flex-col justify-start items-center gap-x-4 gap-y-2",
            "lg:items-end",
          )}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx("w-fit button gap-1")}
          >
            {isSubmitting ? (
              <>
                <span>Enviando...</span>
                <IconSpinner className="text-white size-5 stroke-2" />
              </>
            ) : isSubmitSuccessful ? (
              <>
                <span>Mensaje enviado</span>
                <IconEmailSended className="inline size-5 stroke-2" />
              </>
            ) : (
              <span>Enviar mensaje</span>
            )}
          </button>
        </div>
      </FormProvider>
    </form>
  );
}
