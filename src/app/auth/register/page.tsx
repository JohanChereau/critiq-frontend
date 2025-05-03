"use client";

import { Button } from "@/components/ui/button";
import RegisterForm from "@/features/register/components/register-form";
import { signIn } from "next-auth/react";
import React from "react";

function Register() {
  return (
    <div>
      <Button onClick={() => signIn()}>Register</Button>
      <RegisterForm />
    </div>
  );
}

export default Register;
