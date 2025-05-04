"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import UserAvatar from "../user-avatar";
import { Button } from "../ui/button";
import { EnterIcon } from "@radix-ui/react-icons";

const Header = () => {
  const { data: session, status } = useSession();
  console.log({ session });
  return (
    <header className="container mx-auto flex justify-between p-4">
      <h1>
        <Link href={"/"} className="text-foreground text-2xl font-bold">
          Criti<span className="text-primary">Q</span>
        </Link>
      </h1>
      <div>
        {status === "loading" && (
          <Skeleton className="aspect-square w-12 rounded-full" />
        )}
        {status === "authenticated" && session && (
          <UserAvatar user={session.user} />
        )}
        {status === "unauthenticated" && !session && (
          <Button variant={"outline"} asChild>
            <Link href={"/auth/login"}>
              <EnterIcon />
              <span>Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
