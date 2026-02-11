import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | CIMS - Commerce Inventory Management System",
  description: "Sign in to your CIMS account to manage inventory across all your marketplaces",
};

export default function SignIn() {
  return <SignInForm />;
}
