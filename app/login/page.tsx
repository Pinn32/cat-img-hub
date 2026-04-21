import { auth, signIn } from "@/auth";
import {
  LoginButton,
  LoginCard,
  LoginText,
  LoginTitle,
  LoginWrap,
} from "@/app/login/login-card.styles";

export default async function LoginPage() {
  const session = await auth();

  return (
    <LoginWrap>
      <LoginCard>
        <LoginTitle>{session?.user?.id ? "You are logged in" : "Login"}</LoginTitle>
        <LoginText>
          {session?.user?.id
            ? `Current account: ${session.user.email || "Google user"}`
            : 'Click "Continue with Google" to start the Google sign-in flow.'}
        </LoginText>

        {!session?.user?.id ? (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <LoginButton type="submit">Continue with Google</LoginButton>
          </form>
        ) : null}
      </LoginCard>
    </LoginWrap>
  );
}
