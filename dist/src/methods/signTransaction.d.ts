import { UnvalidatedJsonRpcRequest } from '../types/EIP1193';
import { CreateWepinMiddlewareOptions } from '..';
export declare const signTransaction: ({ wepin, network }: CreateWepinMiddlewareOptions) => (req: UnvalidatedJsonRpcRequest, res: any, next: any, end: any) => void;
