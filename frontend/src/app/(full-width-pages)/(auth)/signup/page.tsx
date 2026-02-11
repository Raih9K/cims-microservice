import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | CIMS - Commerce Inventory Management System",
  description: "Create your CIMS account and start managing inventory across all marketplaces",
};

export default function SignUp() {
  return <SignUpForm />;
}
