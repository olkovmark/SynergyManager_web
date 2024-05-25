"use server";
import { logout } from "@/app/lib/actions";
import { ServiceData, UserData } from "@/common/Types";
import axios, { AxiosInstance } from "axios";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const url = process.env.NEXT_PUBLIC_API_URL;
let managerApi: AxiosInstance;

export async function findUser(user: number | string): Promise<UserData | undefined> {
  try {
    init();

    const res = await managerApi.get(`user?username=${user}`);

    if (res?.status === 200) return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      logout();
      return redirect("/login");
    }

    throw String(error?.response?.data?.error || error.message);
  }
}

export async function getServicesWithUsers(): Promise<ServiceData[] | undefined> {
  try {
    init();

    const res = await managerApi.get(`service`);

    if (res?.status === 200) return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      logout();
      return redirect("/login");
    }

    throw String(error?.response?.data?.error || error.message);
  }
}

async function init() {
  if (!url) throw new Error("API_URL NOT FOUND");
  managerApi = axios.create({
    baseURL: url + "api/",
    headers: {
      "Content-Type": "application/json",
      authorization: `${cookies().get("session")?.value}`,
    },
    withCredentials: true, // Add this line for CORS support
  });
  managerApi.interceptors.request.use(
    (config: any) => {
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
}
