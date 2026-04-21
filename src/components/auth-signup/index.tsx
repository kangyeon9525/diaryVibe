import Link from "next/link";

import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";

import styles from "./styles.module.css";

export function AuthSignup() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="auth-signup-title">
        <div className={styles.accent} aria-hidden />

        <div className={styles.inner}>
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
                name="email"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-password">
                비밀번호
              </label>
              <Input
                id="signup-password"
                type="password"
                name="password"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="new-password"
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-password-confirm">
                비밀번호 재입력
              </label>
              <Input
                id="signup-password-confirm"
                type="password"
                name="passwordConfirm"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="비밀번호를 다시 입력해 주세요"
                autoComplete="new-password"
              />
            </div>

            <div className={styles.fieldBlock}>
              <label className={styles.label} htmlFor="signup-name">
                이름
              </label>
              <Input
                id="signup-name"
                type="text"
                name="name"
                variant="primary"
                theme="light"
                className={styles.fieldWidth}
                placeholder="이름을 입력해 주세요"
                autoComplete="name"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="primary"
              theme="light"
              size="large"
              className={styles.buttonWidth}
            >
              회원가입
            </Button>
          </div>

          <div className={styles.divider} aria-hidden />

          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <Link href="/auth/login" className={styles.loginLink}>
              로그인
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
