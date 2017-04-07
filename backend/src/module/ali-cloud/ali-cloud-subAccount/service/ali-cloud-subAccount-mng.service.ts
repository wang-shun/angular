import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudSubAccountMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }
    //获取子账号列表
    getSubAccounts():Promise<any>{
        return;
    }

}
