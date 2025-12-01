import Image from "next/image";
import SpinningBorderButton from "@/components/SpinningGradientBorder";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-16 px-16 bg-slate-950">
        <Image
          className=""
          src="/transparent-logo.png"
          alt="Tic Tac Toe logo"
          width={220}
          height={220}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center">
          <SpinningBorderButton />
        </div>
      </main>
    </div>
  );
}
