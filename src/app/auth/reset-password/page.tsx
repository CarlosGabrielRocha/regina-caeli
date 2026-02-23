import { redirect } from "next/navigation";
import { verifyResetTokenAction } from "../../../actions/auth/verify-reset-token";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token as string | undefined;
  if (!token) {
    redirect("/auth");
  }

  const verificationResult = await verifyResetTokenAction(token);

  if (verificationResult.status !== "ok" || !verificationResult.data?.token) {
    return redirect("/auth/reset-password/error");
  }

  return (
    <>
      <ResetPasswordForm resetToken={verificationResult.data.token} />
    </>
  );
}
