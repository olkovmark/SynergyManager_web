"use server";

import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const response = await fetch(url + "auth", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: formData.get("login"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      const json = await response.json();
      const token = json.token;

      //save token to local storage

      cookies().set("session", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 1,
        path: "/",
      });

      return true;
    }

    const error = await response.json();

    throw error;
  } catch (error: any) {
    console.log(error);
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  cookies().delete("session");
}

export async function fetchServices() {
  const response = await fetch(url + "api/service", {
    headers: {
      Authorization: `${cookies().get("session")}`,
    },
  });

  return await response.json();
}

export async function getUserActions(service_id: number, user_id: number, date?: Date) {
  let dateSeconds = date ? Math.floor(date.getTime() / 1000) : undefined;
  const response = await fetch(
    url + `api/service/${service_id}/user/${user_id}/actions${dateSeconds ? "?date=" + dateSeconds : ""}`,
    {
      headers: {
        Authorization: `${cookies().get("session")}`,
      },
    }
  );

  return await response.json();
}
