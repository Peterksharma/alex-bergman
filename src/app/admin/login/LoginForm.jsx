"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "./actions";
import { Field, inputClass } from "../_components/Field";

export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(login, { error: null });

  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next ?? "/admin"} />
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </Field>
      <Field label="Password" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </Field>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {state?.error && (
          <p className="text-sm text-red-700 font-medium">{state.error}</p>
        )}
      </div>

      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </Button>
    </form>
  );
}
