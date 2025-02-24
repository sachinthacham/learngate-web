import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo2.png" alt="logo" width={40} height={40} />
          <span className="hidden lg:block text-lg font-semibold">
            LearnGate
          </span>
        </Link>
        <Menu />
      </div>

      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-slate-100 flex flex-col">
        <NavBar />

        {children}
      </div>
    </div>
  );
}
