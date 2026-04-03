"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

import { checkInAbi } from "@/lib/checkInAbi";
import {
  getBuilderDataSuffix,
  getCheckInContractAddress,
  getTargetChain,
} from "@/lib/publicEnv";

import { WalletModal } from "./WalletModal";

type DailyCheckInProps = {
  variant?: "inline" | "floating";
};

export function DailyCheckIn({ variant = "floating" }: DailyCheckInProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending: isWriting } = useWriteContract();

  const [walletOpen, setWalletOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const target = getTargetChain();
  const contract = getCheckInContractAddress();
  const walletReady = Boolean(isConnected && address);

  const { data: streak } = useReadContract({
    address: contract,
    abi: checkInAbi,
    functionName: "streak",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(contract && address) },
  });

  async function handleCheckIn() {
    setErr(null);
    if (!contract) {
      setErr("Check-in is not configured (missing contract on server).");
      return;
    }
    if (!walletReady) {
      setWalletOpen(true);
      return;
    }
    try {
      if (chainId !== target.id) {
        await switchChainAsync({ chainId: target.id });
      }
      const dataSuffix = getBuilderDataSuffix();
      await writeContractAsync({
        address: contract,
        abi: checkInAbi,
        functionName: "checkIn",
        chainId: target.id,
        dataSuffix,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Transaction failed";
      setErr(msg);
    }
  }

  const busy = isWriting;

  const outerClass =
    variant === "floating"
      ? "pointer-events-auto fixed bottom-4 left-4 right-4 z-[9999] flex w-full max-w-md flex-col gap-2 sm:left-auto sm:right-4 sm:ml-auto pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      : "relative z-50 w-full max-w-md flex flex-col gap-2";

  return (
    <>
      <div className={outerClass}>
        {err ? (
          <p className="rounded-lg bg-red-950/90 px-3 py-2 text-xs text-red-200">{err}</p>
        ) : null}
        {!contract ? (
          <p className="rounded-lg border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
            Set <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_CHECK_IN_CONTRACT_ADDRESS</code> on
            Vercel to enable check-in.
          </p>
        ) : null}

        <div className="flex flex-col gap-3 rounded-2xl border-2 border-cyan-400/70 bg-[#0a1628] p-4 shadow-[0_0_28px_rgba(34,211,238,0.25)]">
          <div>
            <p className="font-orbitron text-sm font-semibold tracking-wide text-cyan-300">
              Daily check-in
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {walletReady
                ? `Connected · ${address!.slice(0, 6)}…${address!.slice(-4)}${
                    streak != null ? ` · streak ${String(streak)}` : ""
                  }`
                : "Step 1: connect your wallet on Base. Step 2: tap Check in."}
            </p>
          </div>

          {!mounted ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" aria-hidden />
          ) : !walletReady ? (
            <button
              type="button"
              onClick={() => setWalletOpen(true)}
              className="min-h-[48px] w-full rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-[#061018] shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300 active:scale-[0.99]"
            >
              Connect wallet
            </button>
          ) : (
            <button
              type="button"
              disabled={busy || !contract}
              onClick={() => void handleCheckIn()}
              className="min-h-[48px] w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white shadow-lg transition enabled:bg-fuchsia-500 enabled:shadow-fuchsia-500/30 enabled:hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {busy ? "Confirm in wallet…" : "Check in"}
            </button>
          )}
        </div>
      </div>
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}
