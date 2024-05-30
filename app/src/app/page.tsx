import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center border border-red-500">
      <h2 className="text-2xl mb-4">Welcome to JERAFLIX App</h2>
      <div className="space-x-4">
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
}
