"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  createActivateAccountAction,
  ActivateAccountState,
} from "../lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ActivateAccountForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [state, formAction, pending] = useActionState(
    createActivateAccountAction,
    {} as ActivateAccountState,
  );

  // Redirect to login page after success
  useEffect(() => {
    if (state.success) {
      toast("Account activated!", {
        description: "Redirecting to login…",
      });
      setTimeout(() => router.push("/auth/login"), 1500);
    }
    if (state.error) {
      toast(state.error);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-md space-y-6 rounded-lg p-6 shadow"
    >
      <h2 className="text-xl font-semibold">Activate your account</h2>

      <div>
        <Label htmlFor="code" className="pb-2">
          6-digit code
        </Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
        />
        {state.error && (
          <p className="mt-1 text-sm text-red-600">{state.error}</p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Verifying…" : "Verify email"}
      </Button>

      {state.success && (
        <p className="mt-4 text-center text-green-600">
          {state.success} Redirecting to login…
        </p>
      )}
    </form>
  );
}
