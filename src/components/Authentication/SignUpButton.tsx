import React from "react";
import { Button, buttonVariants } from "../ui/button";

const SignUpButton = () => {
  return (
    <Button className={buttonVariants({variant:"outline"})}>
      <div>
        <p className="font-bold">Sign Up</p>
      </div>
    </Button>
  );
};

export default SignUpButton;
