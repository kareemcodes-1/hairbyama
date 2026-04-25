"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { registerUser } from "@/actions/registerUser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn-primary dark-pink w-full"
    >
      {pending ? <Spinner className="size-8" /> : "Create Account"}
    </button>
  );
};

const Register = () => {
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    const userInfo = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const data = await registerUser(userInfo);

      if (data) {
        const res = await signIn("credentials", {
          redirect: false,
          email: userInfo.email,
          password: userInfo.password,
        });

        if (res?.ok) {
          router.push("/");
        } else {
          console.log("Login after register failed", res);
        }
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-[1.5rem] py-[3rem] lg:px-8 lg:py-12">
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="mb-[2rem] lg:mb-[2rem] text-center text-[1.1rem] lg:text-[1.5rem] font-semibold text-black bebas">
            Sign Up To Account
          </h2>

          <form className="space-y-4 lg:space-y-6" action={formAction}>

            <div className="flex flex-col gap-[.5rem]">
              <label className="text-[0.7rem] uppercase text-black/80">
                Name <span className="text-black">*</span>
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                className="h-[3rem] lg:h-[3.5rem] rounded-full uppercase"
              />
            </div>

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

            <div className="flex flex-col gap-[.5rem]">
              <label className="text-[0.7rem] uppercase text-black/80">
                Password <span className="text-black">*</span>
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                className="h-[3rem] lg:h-[3.5rem] rounded-full uppercase"
              />
            </div>

            <div>
              <SubmitBtn />
            </div>
          </form>

          <p className="mt-8 lg:mt-10 text-center text-[.8rem] lg:text-[.825rem] text-muted-foreground uppercase">
            Already have an account?{" "}
            <a href="/auth/login" className="font-semibold text-black hover:text-pink-400 underline transition-colors">
              LOGIN
            </a>
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

export default Register;
