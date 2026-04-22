"use client";

import Link from "next/link";

import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { staticPaths } from "@/commons/constants/url";

import { useAuthLoginForm } from "./hooks/index.form.hook";
import styles from "./styles.module.css";

export function AuthLogin() {
  const { register, onSubmit, isValid, isSubmitBlocked } = useAuthLoginForm();

  return (
    <main
      className={styles.page}
      data-testid="auth-login-page-loaded"
    >
      <section className={styles.card} aria-labelledby="auth-login-title">
        <div className={styles.accent} aria-hidden />

        <form className={styles.inner} onSubmit={onSubmit} noValidate>
          <header className={styles.header}>
            <h1 id="auth-login-title" className={styles.title}>
              로그인
            </h1>
            <p className={styles.subtitle}>
              다시 오신 것을 환영해요. 나만의 일기를 이어가 보세요.
            </p>
          </header>

          <div className={styles.fields}>
            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="login-email">
                이메일
              </label>
              <Input
                id="login-email"
                type="email"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="you@example.com"
                autoComplete="email"
                data-testid="auth-login-func-form-email"
                {...register("email")}
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="login-password">
                비밀번호
              </label>
              <Input
                id="login-password"
                type="password"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="current-password"
                data-testid="auth-login-func-form-password"
                {...register("password")}
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
              data-testid="auth-login-func-form-submit"
            >
              로그인
            </Button>
          </div>

          <div className={styles.divider} aria-hidden />

          <div className={styles.footer}>
            <span className={styles.footerText}>아직 계정이 없으신가요?</span>
            <Link href={staticPaths.authSignup} className={styles.signupLink}>
              회원가입
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
