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

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1)
      .refine((v) => v.includes("@"), { message: "이메일에 @가 포함되어야 합니다." }),
    password: z
      .string()
      .min(8)
      .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), {
        message: "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.",
      }),
    passwordConfirm: z.string().min(1),
    name: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

type CreateUserResponse = {
  data?: { createUser?: { _id?: string } };
  errors?: { message: string }[];
};

async function requestCreateUser(input: {
  email: string;
  password: string;
  name: string;
}): Promise<{ _id: string }> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation CreateUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            _id
          }
        }
      `,
      variables: {
        createUserInput: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      },
    }),
  });

  const json = (await res.json()) as CreateUserResponse;

  if (!res.ok) {
    throw new Error(`서버 오류 (${res.status})`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const id = json.data?.createUser?._id;
  if (!id) {
    throw new Error("응답에 _id가 없습니다.");
  }

  return { _id: id };
}

function closeAllModals(close: () => void) {
  for (let i = 0; i < 10; i += 1) {
    close();
  }
}

export function useAuthSignupForm() {
  const { open, close } = useModal();
  const router = useRouter();
  const outcomeModalOpenedRef = useRef(false);

  const mutation = useMutation({
    mutationFn: requestCreateUser,
    onMutate: () => {
      outcomeModalOpenedRef.current = false;
    },
    onSuccess: () => {
      if (outcomeModalOpenedRef.current) return;
      outcomeModalOpenedRef.current = true;

      open(
        <div data-testid="auth-signup-func-form-success-modal">
          <Modal
            variant="info"
            actions="single"
            title="가입 완료"
            description="회원가입이 정상적으로 완료되었습니다."
            primaryLabel="확인"
            onPrimaryClick={() => {
              closeAllModals(close);
              router.push(staticPaths.authLogin);
            }}
          />
        </div>,
      );
    },
    onError: (error: Error) => {
      if (outcomeModalOpenedRef.current) return;
      outcomeModalOpenedRef.current = true;

      open(
        <div data-testid="auth-signup-func-form-failure-modal">
          <Modal
            variant="danger"
            actions="single"
            title="가입 실패"
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
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
      name: values.name,
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
