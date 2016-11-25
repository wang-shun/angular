import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { QuiryDistList } from '../model/dist-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudDriveServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getHostList(page: number, size: number) : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.instance.get");

        let pathParams = [
            {
                key: 'page',
                value: page
            }, 
            {
                key: 'size',
                value: size
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                           
        return request;
    }

    getDistList(quiry:QuiryDistList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }

    //数据字典所用到的值
    dictSourceType = this.dict.get({ 
        owner : "RESOURCE_USAGE_DETAIL",
        field : "SOURCE_TYPE"
    })

    dictStatus = this.dict.get({ 
        owner : "SUBINSTANCE",
        field : "STATUS"
    })

}