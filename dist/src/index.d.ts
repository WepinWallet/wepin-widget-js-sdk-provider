export type SupportedChains = 'evmeth-goerli' | 'klaytn' | 'ethereum' | 'klaytn-testnet' | 'evmpolygon' | 'evmpolygon-testnet' | 'evmsongbird';
export interface CreateWepinMiddlewareOptions {
    wepin: any;
    network?: SupportedChains;
}
