"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    if (!email || !password) {
      setFieldError("Both email and password are required");
      return;
    }

    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      // this is the message thrown in authorize()
      setFieldError(res.error);
      toast.error(res.error);
    } else {
      toast.success("Logged in! Redirecting…");
      router.push("/"); // or wherever you want
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[800px] space-y-8">
      <div>
        <Label htmlFor="email" className="pb-2">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="password" className="pb-2">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {fieldError && <p className="text-sm text-red-600">{fieldError}</p>}

      <div className="ml-auto w-fit">
        <Button variant="linkMuted">Forgot your password?</Button>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Signing in…" : "Sign in"}
      </Button>

      <p className="flex items-center justify-center">
        {"Don't have an account? "}
        <Button
          variant={"link"}
          className="text-foreground p-2 text-base underline"
          asChild
        >
          <Link href={"/auth/register"}>{"Sign up "}</Link>
        </Button>
      </p>
    </form>
  );
}
