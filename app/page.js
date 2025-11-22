import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h2 className="text-3xl my-10">GSAP Teritory</h2>
        <div className="flex gap-4">
          <Link
            className="my-10 py-2 px-6 border-2 border-red-400 rounded-md"
            href="/parallax-hero"
          >
            Parallax Hero
          </Link>
          <Link
            className="my-10 py-2 px-6 border-2 border-red-400 rounded-md"
            href="/counter-section"
          >
           Counter Section
          </Link>
          <Link
            className="my-10 py-2 px-6 border-2 border-red-400 rounded-md"
            href="/locomotive-scroll"
          >
            Locomotive Scroll
          </Link>
        </div>
      </main>
    </div>
  );
}
