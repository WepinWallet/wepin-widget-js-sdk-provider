export type SupportedChains = 'evmeth-goerli' | 'klaytn' | 'ethereum' | 'klaytn-testnet' | 'evmpolygon' | 'evmpolygon-testnet' | 'evmsongbird' | 'evmtimenetwork-testnet';
export interface CreateWepinMiddlewareOptions {
    wepin: any;
    network?: SupportedChains;
}
export * from './BaseProvider';
