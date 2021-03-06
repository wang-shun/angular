import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService} from '../../../../architecture';

import { StorageList_mock} from '../model/storage-list.mock';

@Injectable()
export class StoreResService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    pfDic = this.dict.get({
        owner: "PLATFORM",
        field: "TYPE"
    });
    statusDic = this.dict.get({
        owner: "MAINTAIN",
        field: "STATUS"
    });
    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getStorageList(PlatformId:string): Promise<any> {
        const pathParams = [
            {
                key: "platformId",
                value: PlatformId
            }
           
        ];
        const api = this.restApiCfg.getRestApi("store-res.storage.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => StorageList_mock);
    }
}