import { useState } from "react";
import TicTacToe from "./tictactoe-game";

const SpinningBorderButton = ({ setRefreshKey }) => {
  const [isGodMode, setIsGodMode] = useState(false);

  // Choose colors based on whether God Mode is active
  const spinnerBackground = isGodMode
    ? "conic-gradient(rgba(255, 165, 0, 0.9) 0deg, rgba(255, 69, 0, 0.9) 60deg, transparent 150deg)" // orange -> red
    : "conic-gradient(rgba(244, 114, 182, 0.8) 0deg, rgba(192, 132, 252, 0.8) 60deg, transparent 150deg)"; // original pink/purple

  return (
    <div className="flex flex-col h-full w-full md:p-12 justify-center items-center bg-slate-950 space-y-6">
      <div className="relative p-[2px] overflow-hidden">
        {/* Spinning conic gradient */}
        <div
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] animate-spin-slow"
          style={{ background: spinnerBackground }}
        />

        {/* Inner Button / Content */}
        <div className="relative flex items-center justify-center bg-black px-6 py-2 text-sm text-white font-medium">
          {/* Pass the callback so the child can tell us when God Mode is active */}
          <TicTacToe
            setRefreshKey={setRefreshKey}
            onGodModeChange={setIsGodMode}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes spinSlow {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spinSlow 5s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SpinningBorderButton;