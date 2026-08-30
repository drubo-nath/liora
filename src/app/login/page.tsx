import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Liora with your mobile number.",
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-20">
      <p className="eyebrow text-clay">Welcome Back</p>
      <h1 className="headline mt-4 text-5xl">
        Sign <em>in</em>
      </h1>
      <div className="mt-10">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
