export type SupportedChains = 'evmeth-goerli' | 'klaytn' | 'ethereum' | 'klaytn-testnet' | 'polygon' | 'evmsongbird';
export interface CreateWepinMiddlewareOptions {
    wepin: any;
    network?: SupportedChains;
}
