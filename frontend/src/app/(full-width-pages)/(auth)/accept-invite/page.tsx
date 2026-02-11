import AcceptInviteForm from "@/components/auth/AcceptInviteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Team | CIMS - Commerce Inventory Management System",
  description: "Accept your invitation to join CIMS",
};

export default function AcceptInvitePage() {
  return <AcceptInviteForm />;
}
