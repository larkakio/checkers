/** Webpack resolves these to `@wagmi/connectors` implementation files (see next.config.js). */
declare module "@checkers-wagmi/baseAccount" {
  export { baseAccount } from "@wagmi/connectors";
}

declare module "@checkers-wagmi/walletConnect" {
  export { walletConnect } from "@wagmi/connectors";
}
