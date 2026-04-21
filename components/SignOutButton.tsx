// Member: Aiqi Xu
// SignOutButton

import { signOut } from "@/auth";
import { NavButton } from "@/components/NavBar.styles";

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
