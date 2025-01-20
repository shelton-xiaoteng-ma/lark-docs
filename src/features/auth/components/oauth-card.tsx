"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthStateStore } from "../store/use-auth-state-store";

export const OAuthCard = () => {
  const { loading, setLoading } = useAuthStateStore();

  const handleSignIn = async (provider: string) => {
    setLoading(true);
    try {
      const res = await signIn(provider, {
        redirect: false,
      });
      if (res?.error) {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          color="gray"
          className="w-full"
          onClick={() => handleSignIn("github")}
          disabled={loading}
        >
          <FaGithub /> Github
        </Button>
        <Button
          variant="outline"
          color="gray"
          className="w-full"
          onClick={() => handleSignIn("google")}
          disabled={true}
        >
          <FcGoogle /> Google
        </Button>
      </div>
      <Separator className="my-6" />
    </div>
  );
};
