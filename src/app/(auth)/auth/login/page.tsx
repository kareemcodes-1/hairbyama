"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn-primary dark-pink w-full"
    >
      {pending ? <Spinner className="size-8" /> : "LOG IN"}
    </button>
  );
};

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-[1.5rem] py-[3rem] lg:px-8 lg:py-12">
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="mb-[2rem] text-center text-[1.1rem] lg:text-[1.5rem] font-semibold text-black">
            Sign In To Account
          </h2>

          <form className="space-y-4 lg:space-y-6" action={formAction}>
            <div className="flex flex-col gap-[.5rem]">
              <label className="text-[0.7rem] uppercase text-black/80">
                Email <span className="text-black">*</span>
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                className="h-[3rem] lg:h-[3.5rem] rounded-full uppercase"
              />
            </div>

            <div>



              <div className="relative flex flex-col gap-[.5rem] w-full">
                <div className="flex items-center justify-between w-full">
                  <label className="text-[0.7rem] uppercase text-black/80">
                    Password <span className="text-black">*</span>
                  </label>
                  <Link href="/" className="text-[.75rem] lg:text-[.8rem] text-muted-foreground">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="h-[3rem] lg:h-[3.5rem] rounded-full pr-[3rem]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-[1rem] bottom-[0.875rem] text-black/40 hover:text-pink-500 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                </button>
              </div>
            </div>

            <div>
              <SubmitBtn />
            </div>
          </form>

          <p className="mt-8 lg:mt-10 text-center text-[.8rem] lg:text-[.825rem] text-muted-foreground telegraf uppercase font-[200]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-black hover:text-pink-400 transition-colors underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/hero.jpg"
          alt="Right side illustration"
          className="h-[100vh] w-full object-cover"
          width={500}
          height={500}
          quality={75}
        />
      </div>
    </div>
  );
};

export default Login;