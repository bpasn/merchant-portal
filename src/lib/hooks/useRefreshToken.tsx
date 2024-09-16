"use client";

import { signIn, useSession } from "next-auth/react";
import axiosServer from "../utils/axios-server";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axiosServer.post("/auth/refresh-token", {
      refresnToken: session?.user?.accessToken
    });

    if (session) {
     await update({
      ...session,
      accessToken:res.data.accessToken,
      user:{
        ...session.user
      }
     })
    }
    else signIn();
  };
return refreshToken;
};