import { useUser } from "./StudentContext";

function Header() {
  const student = useUser();

  return (
    <header>
      <h1>THE Study Room</h1>
      <p>Hello, {student.name} ({student.year})</p>
    </header>
  );
}

export default Header;
