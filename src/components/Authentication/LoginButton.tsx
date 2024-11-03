import React from "react";
import { Button, buttonVariants } from "../ui/button";

const LoginButton = () => {
  return (
    <Button className={buttonVariants({variant:"outline"})}>
      <div>
        <p className="font-bold">Login</p>
      </div>
    </Button>
  );
};

export default LoginButton;
