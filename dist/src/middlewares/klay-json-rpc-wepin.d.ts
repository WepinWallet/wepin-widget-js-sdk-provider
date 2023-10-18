import { CreateWepinMiddlewareOptions } from '..';
/**
 * Methods handling RPC requests would be proceeded on Wepin widget
 *
 * @param wepin Wepin Object to connect with
 * @param network network string injected by client when getting provider
 * @returns
 */
export declare const createWepinMiddleware: ({ wepin, network, }: CreateWepinMiddlewareOptions) => import("json-rpc-engine").JsonRpcMiddleware<unknown, unknown>;
