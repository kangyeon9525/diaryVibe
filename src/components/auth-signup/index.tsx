"use client";

import Link from "next/link";

import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { staticPaths } from "@/commons/constants/url";

import { useAuthSignupForm } from "./hooks/index.form.hook";
import styles from "./styles.module.css";

export function AuthSignup() {
  const { register, onSubmit, isValid, isSubmitBlocked } = useAuthSignupForm();

  return (
    <main
      className={styles.page}
      data-testid="auth-signup-page-loaded"
    >
      <section className={styles.card} aria-labelledby="auth-signup-title">
        <div className={styles.accent} aria-hidden />

        <form className={styles.inner} onSubmit={onSubmit} noValidate>
          <header className={styles.header}>
            <h1 id="auth-signup-title" className={styles.title}>
              회원가입
            </h1>
            <p className={styles.subtitle}>
              새 계정을 만들고 나만의 일기를 시작해 보세요.
            </p>
          </header>

          <div className={styles.fields}>
            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-email">
                이메일
              </label>
              <Input
                id="signup-email"
                type="email"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="you@example.com"
                autoComplete="email"
                data-testid="auth-signup-func-form-email"
                {...register("email")}
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-password">
                비밀번호
              </label>
              <Input
                id="signup-password"
                type="password"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="new-password"
                data-testid="auth-signup-func-form-password"
                {...register("password")}
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-password-confirm">
                비밀번호 재입력
              </label>
              <Input
                id="signup-password-confirm"
                type="password"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="비밀번호를 다시 입력해 주세요"
                autoComplete="new-password"
                data-testid="auth-signup-func-form-password-confirm"
                {...register("passwordConfirm")}
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-name">
                이름
              </label>
              <Input
                id="signup-name"
                type="text"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="이름을 입력해 주세요"
                autoComplete="name"
                data-testid="auth-signup-func-form-name"
                {...register("name")}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              theme="light"
              size="large"
              className={styles.buttonWidth}
              disabled={!isValid || isSubmitBlocked}
              data-testid="auth-signup-func-form-submit"
            >
              회원가입
            </Button>
          </div>

          <div className={styles.divider} aria-hidden />

          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <Link href={staticPaths.authLogin} className={styles.loginLink}>
              로그인
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
