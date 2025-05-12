import { EMAIL_REGEX, FORMAT } from "@/utils/string";
import { useCallback, useMemo } from "react";
import type { RegisterOptions } from "react-hook-form";

/**
 * @example
 * const required = useFieldIsRequired()
 * <input {...form.register('field', { required })} />
 */
export function useFieldIsRequired(
  message = "Este campo es requerido",
): RegisterOptions["required"] {
  return useMemo(() => ({ value: true, message }), [message]);
}

/**
 * @example
 * const words_2 = useFieldTextWordCount(2)
 * <textarea {...form.register('field', { validate: words_2 })} />
 */
export function useFieldTextWordCount(
  n: number,
  message = "Debe tener al menos %s palabras",
) {
  return useCallback(
    (value: string | null | undefined) => {
      const words = (value || "").split(/\s+/).filter(Boolean).length;

      return words >= n || FORMAT(message, n);
    },
    [message, n],
  );
}

/**
 * @example
 * const email = useFieldEmail()
 * <input {...form.register('field', { pattern })} />
 */
export function useFieldEmail(
  message = "Ingresa un email válido",
): RegisterOptions["pattern"] {
  return useMemo(() => ({ value: EMAIL_REGEX, message }), [message]);
}

/**
 * @example
 * const email_typo = useFieldEmailTypo()
 * <input {...form.register('field', { validate: email_typo })} />
 */
export function useFieldEmailTypo() {
  return useCallback((value: string) => {
    const typos = ["gmail.con", "gmal.com", "gmal.con", "gmai.com", "gmai.con"];
    for (const typo of typos) {
      if (value.endsWith(typo)) {
        return `Ingresaste un correo inválido (${typo})`;
      }
    }
    return true;
  }, []);
}

/**
 * @example
 * const min_length = useFieldMinLength(2)
 * <input {...form.register('field', { minLength })} />
 */
export function useFieldMinLength(
  n: number,
  message = "Debe tener al menos %s caracteres",
): RegisterOptions["minLength"] {
  return useMemo(() => ({ value: n, message }), [message, n]);
}

/**
 * @example
 * const max_length = useFieldMaxLength(2)
 * <input {...form.register('field', { maxLength })} />
 */
export function useFieldMaxLength(
  n: number,
  message = "Debe tener máximo %s caracteres",
): RegisterOptions["maxLength"] {
  return useMemo(() => ({ value: n, message }), [message, n]);
}
