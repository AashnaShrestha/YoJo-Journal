"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputField({ label, placeholder, name, type = "text", error, onChange, value }) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>

      <Input
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        aria-invalid={!!error}
        onChange={onChange}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </Field>
  );
}
