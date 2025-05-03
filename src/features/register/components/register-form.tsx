"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createRegisterAction } from "../lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptNewsletter: boolean;
};

export default function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    firstname: "",
    lastname: "",
    username: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptNewsletter: false,
  });

  const [state, formAction, pending] = useActionState(createRegisterAction, {
    errors: {},
    success: "",
  });
  const errors = state.errors ?? {};

  useEffect(() => {
    if (state.success) {
      toast.success("Registration successful!", {
        description: "Please check your email for the activation code.",
      });
      router.push("/auth/activate-account");
      return;
    }

    if (state.errors && Object.keys(state.errors).length > 0) {
      Object.values(state.errors).forEach((msg) => {
        toast.error(msg);
      });
    }
  }, [state, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      action={formAction}
      className="mx-auto max-w-lg space-y-6 rounded-lg p-6 shadow"
    >
      {/* First Name */}
      <div>
        <Label htmlFor="firstname" className="pb-2">
          First Name
        </Label>
        <Input
          id="firstname"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          placeholder="John"
        />
        {errors.firstname && (
          <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="lastname" className="pb-2">
          Last Name
        </Label>
        <Input
          id="lastname"
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          placeholder="Doe"
        />
        {errors.lastname && (
          <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <Label htmlFor="username" className="pb-2">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="johndoe"
        />
        <p className="text-xs text-gray-500">
          This is your public display name.
        </p>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <Label htmlFor="dateOfBirth" className="pb-2">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={values.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="pb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="pb-2">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword" className="pb-2">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Accept Terms */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          checked={values.acceptTerms}
          onCheckedChange={(checked: CheckedState) =>
            setValues((prev) => ({
              ...prev,
              acceptTerms: checked === true,
            }))
          }
        />
        <Label htmlFor="acceptTerms" className="!mb-0">
          I accept the Terms and Conditions
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
      )}

      {/* Newsletter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptNewsletter"
          name="acceptNewsletter"
          checked={values.acceptNewsletter}
          onCheckedChange={(checked: CheckedState) =>
            setValues((prev) => ({
              ...prev,
              acceptNewsletter: checked === true,
            }))
          }
        />
        <Label htmlFor="acceptNewsletter" className="!mb-0">
          Subscribe to our newsletter
        </Label>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Submitting…" : "Register"}
      </Button>

      {/* Success */}
      {state.success && (
        <p className="mt-4 text-center text-green-600">{state.success}</p>
      )}
    </form>
  );
}
