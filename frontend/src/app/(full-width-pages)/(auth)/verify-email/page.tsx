import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | CIMS - Commerce Inventory Management System",
  description: "Verify your email address to activate your CIMS account",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
