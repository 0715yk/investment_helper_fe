// utils/auth.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { API_URL } from "../const";

export async function withAuth<T>(
  context: GetServerSidePropsContext,
  callback: () => Promise<GetServerSidePropsResult<T>>
): Promise<GetServerSidePropsResult<T>> {
  const response = await fetch(`${API_URL}/auth/status`, {
    method: "GET",
    headers: {
      cookie: context.req.headers.cookie || "",
    },
  });

  if (!response.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return callback();
}
