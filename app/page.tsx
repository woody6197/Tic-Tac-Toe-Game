"use client";

import Image from "next/image";
import SpinningBorderButton from "@/components/SpinningGradientBorder";
import Scoreboard from "@/components/scoreboard";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col-3 min-h-screen w-full justify-between items-center py-16 px-20 sm:px-8 bg-slate-950">
        <Image
          className="hidden lg:block"
          src="/transparent-logo.png"
          alt="Tic Tac Toe logo"
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col items-center text-center">
          <SpinningBorderButton setRefreshKey={setRefreshKey} />
          <Scoreboard refreshKey={refreshKey} />
        </div>
        <Image
          className="hidden lg:block"
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
