import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex h-14 w-full flex-row items-end justify-between">
      <Link href="/" className="m-2 text-2xl font-bold">
        Aniduel
      </Link>
      <div className="flex items-end">
        <Link href="/" className="m-2 text-xl">
          Home
        </Link>
        <Link href="/leaderboard" className="m-2 text-xl">
          Leaderboard
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
