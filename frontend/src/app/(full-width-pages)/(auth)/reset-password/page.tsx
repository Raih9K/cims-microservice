import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | CIMS - Commerce Inventory Management System",
  description: "Create a new password for your CIMS account",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
