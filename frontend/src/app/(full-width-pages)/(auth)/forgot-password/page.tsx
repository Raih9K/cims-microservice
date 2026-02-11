import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | CIMS - Commerce Inventory Management System",
  description: "Reset your CIMS account password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
