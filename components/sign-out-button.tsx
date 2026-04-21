import { signOut } from "@/auth";
import { NavButton } from "@/components/navigation-bar.styles";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <NavButton type="submit">Logout</NavButton>
    </form>
  );
}
