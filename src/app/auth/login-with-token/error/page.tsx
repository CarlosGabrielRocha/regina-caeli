import ErrorPage from "../../../../views/Error";

export default function LoginWithTokenErrorPage() {
  return (
    <ErrorPage
      title="Token Inválido ou Expirado"
      description="O token de login que você tentou acessar não é mais válido."
      content="Isso pode acontecer se o token já foi utilizado ou se expirou (os tokens são válidos por tempo limitado). Você pode voltar para a tela de Login e tentar novamente."
      callbackRoute="/auth"
    />
  );
}
