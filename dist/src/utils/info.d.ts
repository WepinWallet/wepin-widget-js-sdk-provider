import { SupportedChains } from '..';
export interface NetworkInformation {
    rpcUrl: string;
    chainId: string;
}
export declare const getNetworkInfoByName: (network: SupportedChains) => NetworkInformation;
/**
 * Check the valid chain ID to change the chainId to network
 *'0x'-prefixed string. (default: ethereum)
 * @param chainId - The chain ID to validate.
 * @returns network e.g) ethereum, klaytn
 */
export declare const getNetworkByChainId: (chainId: unknown) => string;
