"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { updateUser } from "@/actions/updateUser";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn-primary dark-pink w-full"
    >
      {pending ? <Spinner className="size-6 lg:size-8" /> : "SAVE CHANGES"}
    </button>
  );
};

const ProfilePage = () => {
  const { data: session, update: updateSession } = useSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  async function formAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!email || !name) {
      toast.error("Name and email are required");
      return;
    }

    if (newPassword && !currentPassword) {
      toast.error("Enter current password to set a new password");
      return;
    }

    const payload = {
      name,
      email,
      currentPassword: currentPassword || null,
      newPassword: newPassword || null,
    };

    try {
      const updatedUser = await updateUser(session?.user.id as string, payload);
      await updateSession({ name: updatedUser.name, email: updatedUser.email });
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  }

  return (
    <section className="pt-[6rem] lg:pt-[7rem] pb-[4rem] px-[1.5rem] lg:px-[3rem]">
      <div>
        <h1 className="text-[2rem] md:text-[3.5rem] lg:text-[5.5rem] mb-[1.5rem] lg:mb-[3rem]">
          Profile
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] lg:gap-[1rem]">

          {/* Account Settings */}
          <div className="flex flex-col gap-[1.5rem] lg:gap-[2rem]">
            {/* <h2 className="text-[.7rem] uppercase text-black/50">
              Account Settings
            </h2> */}
            <form
              className="flex items-start gap-[1rem] lg:gap-[1.25rem] flex-col w-full"
              action={formAction}
            >
              <div className="flex flex-col gap-[.5rem] w-full">
                <label className="text-[0.7rem] uppercase text-black/80">
                  Name <span className="text-black">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  className="h-[3rem] rounded-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-[.5rem] w-full">
                <label className="text-[0.7rem] uppercase text-black/80">
                  Email address <span className="text-black">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="h-[3rem] rounded-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-[.5rem] w-full">
                <label className="text-[0.7rem] uppercase text-black/80">
                  Current Password
                </label>
                <Input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  className="h-[3rem] rounded-full"
                />
              </div>

              <div className="flex flex-col gap-[.5rem] w-full">
                <label className="text-[0.7rem] uppercase text-black/80">
                  New Password
                </label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="h-[3rem] rounded-full"
                />
              </div>

              <div className="w-full mt-[.25rem]">
                <SubmitBtn />
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfilePage;