import { SignOutButton } from "@/components/sign-out-button";
import { Bar, Brand, Links, NavLink } from "@/components/navigation-bar.styles";

type NavigationBarProps = {
  isLoggedIn: boolean;
};

export function NavigationBar({ isLoggedIn }: NavigationBarProps) {
  return (
    <Bar>
      <Brand>Cat Img Hub</Brand>
      <Links>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/favorites">Favorites</NavLink>
        <NavLink href="/search">Search</NavLink>
        <NavLink href="/login">{isLoggedIn ? "Account" : "Login"}</NavLink>
        {isLoggedIn ? <SignOutButton /> : null}
      </Links>
    </Bar>
  );
}
