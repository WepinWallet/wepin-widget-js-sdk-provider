import { UnvalidatedJsonRpcRequest } from '../types/EIP1193';
import { CreateWepinMiddlewareOptions } from '..';
/**
 * eth_sign: [address, data]
 * personal_sign: [data, address]
 */
export declare const sign: ({ wepin, network, isPersonal, }: CreateWepinMiddlewareOptions & {
    isPersonal: boolean;
}) => (req: UnvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
