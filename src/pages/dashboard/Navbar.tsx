import { User } from "../../lib/services/authenticationContext/authentication.context";

export default function Navbar({ user }: { user: User }) {
  const name = user.username;
  return (
    <nav className="space-y-2">
      <div className="text-xl full text-start text-third">
        Bienvenido,{" "}
        <span className="text-2xl font-semibold">{name.toUpperCase()}</span>
      </div>
    </nav>
  );
}
