// Member: Aiqi Xu
// NavBar: brand link, page links, and login/out button

import { SignOutButton } from "@/components/SignOutButton";
import { Bar, Brand, Links, NavLink } from "@/components/NavBar.styles";

type NavigationBarProps = {
  isLoggedIn: boolean;
};

export function NavigationBar({ isLoggedIn }: NavigationBarProps) {
  return (
    <Bar>
      <Brand href="/">Cat Img Hub</Brand>
      <Links>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/favorites">Favorites</NavLink>
        <NavLink href="/search">Search</NavLink>
        {/* display log-in or sign-out button */}
        <NavLink href="/login">{isLoggedIn ? "Account" : "Login"}</NavLink>
        {isLoggedIn ? <SignOutButton /> : null}
      </Links>
    </Bar>
  );
}
