"use client";

import { authenticate } from "@/app/lib/actions";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./styles.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function Page() {
  const [login, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (login) {
      window.location.href = "/";
    }
  }, [login]);

  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <form action={dispatch} className={styles.form}>
        <Input type="text" name="login" placeholder="login" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div>{login && <p>{login}</p>}</div>
        <Button aria-disabled={pending} type="submit" onClick={handleClick}>
          Login
        </Button>
      </form>
    </div>
  );
}
