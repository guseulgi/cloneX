"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function onSubmit(
  prevState: { message: string | null },
  formData: FormData
): Promise<any> {
  // FormData 검증
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }

  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }

  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }

  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  formData.set("nickname", formData.get("name") as string);

  // redirect 용 플래그
  let shouldRedirect = false;

  // 회원 가입
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );

    if (response.status === 403) {
      return { message: "user_exists" };
    }

    shouldRedirect = true;

    // 바로 로그인
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.log(err);
    return;
  }

  if (shouldRedirect) {
    redirect("/home");
  }
}
