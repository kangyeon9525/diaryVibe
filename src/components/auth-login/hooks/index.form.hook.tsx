"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { staticPaths } from "@/commons/constants/url";

const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

const loginSchema = z.object({
  email: z
    .string()
    .min(1)
    .refine((v) => v.includes("@"), { message: "이메일에 @가 포함되어야 합니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginUserResponse = {
  data?: { loginUser?: { accessToken?: string } };
  errors?: { message: string }[];
};

type FetchUserLoggedInResponse = {
  data?: { fetchUserLoggedIn?: { _id?: string; name?: string } };
  errors?: { message: string }[];
};

async function requestLoginUser(input: {
  email: string;
  password: string;
}): Promise<string> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation LoginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            accessToken
          }
        }
      `,
      variables: {
        email: input.email,
        password: input.password,
      },
    }),
  });

  const json = (await res.json()) as LoginUserResponse;

  if (!res.ok) {
    throw new Error(`서버 오류 (${res.status})`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const accessToken = json.data?.loginUser?.accessToken;
  if (!accessToken) {
    throw new Error("응답에 accessToken이 없습니다.");
  }

  return accessToken;
}

async function requestFetchUserLoggedIn(accessToken: string): Promise<{
  _id: string;
  name: string;
}> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query FetchUserLoggedIn {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
    }),
  });

  const json = (await res.json()) as FetchUserLoggedInResponse;

  if (!res.ok) {
    throw new Error(`서버 오류 (${res.status})`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const user = json.data?.fetchUserLoggedIn;
  const id = user?._id;
  const name = user?.name;
  if (!id || name === undefined || name === null) {
    throw new Error("회원 정보 응답이 올바르지 않습니다.");
  }

  return { _id: id, name };
}

async function requestLoginFlow(input: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; user: { _id: string; name: string } }> {
  const accessToken = await requestLoginUser(input);
  window.localStorage.setItem("accessToken", accessToken);

  const user = await requestFetchUserLoggedIn(accessToken);
  window.localStorage.setItem(
    "user",
    JSON.stringify({ _id: user._id, name: user.name }),
  );

  return { accessToken, user };
}

function closeAllModals(close: () => void) {
  for (let i = 0; i < 10; i += 1) {
    close();
  }
}

export function useAuthLoginForm() {
  const { open, close } = useModal();
  const router = useRouter();
  const outcomeModalOpenedRef = useRef(false);

  const mutation = useMutation({
    mutationFn: requestLoginFlow,
    onMutate: () => {
      outcomeModalOpenedRef.current = false;
    },
    onSuccess: () => {
      if (outcomeModalOpenedRef.current) return;
      outcomeModalOpenedRef.current = true;

      open(
        <div data-testid="auth-login-func-form-success-modal">
          <Modal
            variant="info"
            actions="single"
            title="로그인 완료"
            description="로그인에 성공했습니다."
            primaryLabel="확인"
            onPrimaryClick={() => {
              closeAllModals(close);
              router.push(staticPaths.diaries);
            }}
          />
        </div>,
      );
    },
    onError: (error: Error) => {
      if (outcomeModalOpenedRef.current) return;
      outcomeModalOpenedRef.current = true;

      open(
        <div data-testid="auth-login-func-form-failure-modal">
          <Modal
            variant="danger"
            actions="single"
            title="로그인 실패"
            description={error.message}
            primaryLabel="확인"
            onPrimaryClick={() => {
              closeAllModals(close);
            }}
          />
        </div>,
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  });

  const isSubmitBlocked = mutation.isPending;

  return {
    register,
    onSubmit,
    isValid,
    isSubmitBlocked,
  };
}
