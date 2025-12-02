import Image from "next/image";
import SpinningBorderButton from "@/components/SpinningGradientBorder";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col-3 min-h-screen w-full justify-between items-center py-16 px-20 bg-slate-950">
        <Image
          className=""
          src="/transparent-logo.png"
          alt="Tic Tac Toe logo"
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col items-center text-center">
          <div>
            <SpinningBorderButton />
          </div>
          <div className="text-white text-2xl">AI says Hi</div>
        </div>
        <Image
          className=""
          src="/transparent-logo.png"
          alt="Tic Tac Toe logo"
          width={300}
          height={300}
          priority
        />
      </main>
    </div>
  );
}
