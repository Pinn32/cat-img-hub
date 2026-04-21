// Member: Aiqi Xu
// Login page content

import { auth, signIn } from "@/auth";
import {
  LoginButton,
  LoginCard,
  LoginText,
  LoginTitle,
  LoginWrap,
} from "@/app/login/login-card.styles";

export default async function LoginPage() {
  // get user auth session
  const session = await auth();

  return (
    <LoginWrap>
      <LoginCard>
        {/* login messages */}
        <LoginTitle>{session?.user?.id ? "You are logged in" : "Login"}</LoginTitle>
        {/* account message / login prompt */}
        <LoginText>
          {session?.user?.id
            ? `Current account: ${session.user.email || "Google user"}`
            : 'Click "Continue with Google" to start the Google sign-in flow.'}
        </LoginText>

        {/* login button: signIn via google oauth */}
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
