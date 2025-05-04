"use client";

import { SessionProvider as Provider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const SessionProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
