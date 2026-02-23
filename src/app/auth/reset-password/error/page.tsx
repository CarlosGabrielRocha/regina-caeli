import ErrorPage from "../../../../views/Error";

export default function ResetPasswordErrorPage() {
  return (
    <ErrorPage
      title="Link Inválido ou Expirado"
      description="O link de redefinição de senha que você tentou acessar não é mais válido."
      content="Isso pode acontecer se o link já foi utilizado ou se expirou (os links são válidos por tempo limitado)."
      callbackRoute="/auth"
    />
  );
}
