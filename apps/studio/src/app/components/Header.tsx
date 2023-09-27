import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex justify-between">
      <span className="font-caveat text-4xl text-white text-shadow shadow-primary">
        BEEVER
      </span>
      <nav>
        <ul className="text-white flex gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
