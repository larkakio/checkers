import { baseAccount } from "@checkers-wagmi/baseAccount";
import { walletConnect } from "@checkers-wagmi/walletConnect";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet } from "wagmi/chains";

import { getTargetChain } from "@/lib/publicEnv";

const target = getTargetChain();
const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [target, mainnet],
  connectors: [
    baseAccount({
      appName: "Checkers",
    }),
    ...(wcProjectId
      ? [
          walletConnect({
            projectId: wcProjectId,
            showQrModal: true,
          }),
        ]
      : []),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [target.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
