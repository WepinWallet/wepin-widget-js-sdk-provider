import { UnvalidatedJsonRpcRequest } from '../types/EIP1193';
import { CreateWepinMiddlewareOptions } from '..';
/**
 * params: [address, stringified typed message]
 */
export declare const signTypedData: ({ wepin, network, version, }: CreateWepinMiddlewareOptions & {
    version: 'V1' | 'V3' | 'V4';
}) => (req: UnvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
