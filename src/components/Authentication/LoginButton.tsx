import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      className={buttonVariants({ variant: "outline" })}
      href="/sign-in"
      passHref
    >
      <div>
        <p className="font-bold">Login</p>
      </div>
    </Link>
  );
};

export default LoginButton;
