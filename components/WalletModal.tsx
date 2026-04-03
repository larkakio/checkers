"use client";

import { useEffect, useState } from "react";
import { useConnect } from "wagmi";

type Props = {
  open: boolean;
  onClose: () => void;
};

function connectErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return "Connection failed";
}

export function WalletModal({ open, onClose }: Props) {
  const { connectors, connectAsync, isPending } = useConnect();
  const [connectErr, setConnectErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) setConnectErr(null);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/80 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div className="w-full max-w-sm rounded-2xl border-2 border-cyan-500/40 bg-[#0c1228] p-5 shadow-2xl shadow-cyan-500/20">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 id="wallet-modal-title" className="font-orbitron text-lg text-cyan-300">
            Connect wallet
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-lg text-sm text-slate-400 hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-slate-300">
          Open in the <strong className="text-white">Base app</strong> and pick{" "}
          <strong className="text-white">Base Account</strong>, or use WalletConnect below if this project has{" "}
          <code className="rounded bg-black/40 px-1">NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID</code> set.
        </p>
        {connectErr ? (
          <p className="mb-4 rounded-lg bg-red-950/90 px-3 py-2 text-xs text-red-100">{connectErr}</p>
        ) : null}
        {connectors.length === 0 ? (
          <p className="rounded-lg border border-amber-500/40 bg-amber-950/50 px-3 py-3 text-xs text-amber-100">
            No connectors loaded. Try refreshing the page.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {connectors.map((connector) => (
              <li key={connector.uid}>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    void (async () => {
                      setConnectErr(null);
                      try {
                        await connectAsync({ connector });
                        onClose();
                      } catch (e) {
                        setConnectErr(connectErrorMessage(e));
                      }
                    })();
                  }}
                  className="flex min-h-[52px] w-full items-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-cyan-500/20 disabled:opacity-40"
                >
                  {connector.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
