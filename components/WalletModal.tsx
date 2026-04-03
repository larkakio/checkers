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
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div className="w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-[#0f1435] p-4 shadow-xl shadow-cyan-500/10">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="wallet-modal-title" className="font-orbitron text-lg text-cyan-300">
            Connect wallet
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <p className="mb-3 text-xs text-slate-400">
          In the Base app, choose <strong className="text-slate-200">Base Account</strong>. On desktop, use
          WalletConnect if configured.
        </p>
        {connectErr ? (
          <p className="mb-3 rounded-lg bg-red-950/90 px-3 py-2 text-xs text-red-200">{connectErr}</p>
        ) : null}
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                {connector.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
