import React, { FormEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export default function AuthFormContainer({
  children,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}