import { JsonRpcEngine, JsonRpcMiddleware } from 'json-rpc-engine';
import { BaseProviderState, RequestArguments, UnvalidatedJsonRpcRequest } from './types/EIP1193';
import SafeEventEmitter from './safeEventEmitter';
import type { ProviderInfo } from './types/EIP5749';
export interface BaseProviderOptions {
    logger?: Console;
    maxEventListeners?: number;
    rpcMiddleware?: JsonRpcMiddleware<unknown, unknown>[];
}
export declare abstract class BaseProvider extends SafeEventEmitter implements ProviderInfo {
    protected _rpcEngine: JsonRpcEngine;
    protected _log: Console;
    protected _state: BaseProviderState;
    protected static _defaultState: BaseProviderState;
    chainId: string | null;
    selectedAddress: string | null;
    constructor({ logger, maxEventListeners, rpcMiddleware, }?: BaseProviderOptions);
    uuid: string;
    name: string;
    icon: `data:image/svg+xml;base64,${string}`;
    description: 'Wepin provider';
    request<T>(args: RequestArguments): Promise<Partial<T | undefined>>;
    /**
     * Initialize provider
     *
     * @param initialState
     */
    protected _initializeState(initialState?: {
        accounts: string[];
        chainId: string;
        networkVersion?: string;
    }): void;
    protected _rpcRequest(payload: UnvalidatedJsonRpcRequest | UnvalidatedJsonRpcRequest[], callback: (...args: any[]) => void): void;
    protected _handleConnect(chainId: string): void;
    protected _handleDisconnect(isRecoverable: boolean, errorMessage?: string): void;
    protected _handleChainChanged({ chainId, }?: {
        chainId?: string;
        networkVersion?: string;
    }): void;
    protected _handleAccountsChanged(accounts: unknown[], isEthAccounts?: boolean): void;
}
