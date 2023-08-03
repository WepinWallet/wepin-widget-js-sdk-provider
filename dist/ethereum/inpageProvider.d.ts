import { BaseProvider } from '../BaseProvider';
import { SupportedChains } from '..';
import { Wepin } from '@/types';
export default class InpageProvider extends BaseProvider {
    constructor({ network, wepin, }: {
        network: Partial<SupportedChains>;
        wepin: Wepin;
    });
    static generate(params: any): InpageProvider;
}
