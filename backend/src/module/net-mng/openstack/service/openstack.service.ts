import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi , SystemDictionaryService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { Network_mock } from '../model/network.mock.model';
import { Network_Syn } from '../model/network-syn.model';
import { Network } from '../model/network.model';
import { CriteriaQuery } from '../model/criteria-query.model';
import { OptionInfo_mock } from '../model/optionInfo.mock.model';
import { Enable_mock } from '../model/enable.mock.model';
@Injectable()
export class OpenstackService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getNetworks( criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.list");
        return this.restApi.request(api.method, api.url, pathParams, null, 
            {
                "dataCenter": criteriaQuery.dataCenter,
                "platformId": criteriaQuery.platformId,
                "region": criteriaQuery.region,
                "tenantName": criteriaQuery.tenantName
            }
        );

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Network_mock });
    }

    getOptionInfo():Promise<any>{
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return OptionInfo_mock });
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.region_option");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    //启用
    networkStart(id:string):Promise<any>{
        //如果运行状态不是运行中的，则不能启用此网络
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.networkStart");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }
    //禁用
    networkStop(id:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.networkStop");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    //获取同步网络列表
    getSynNetworks(platform_id: string,eids: string):Promise<any>{
        const pathParams = [
            {
                key: "platform_id",
                value: platform_id
            },
            {
                key:"eids",
                value: eids
            }
         ];
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.syn.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return 
    }

    //同步网络-添加
    synNetworkAdd(network_syns: Array<Network_Syn>):Promise<any>{
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.syn.add");
        return this.restApi.request(api.method, api.url, null, null, network_syns);
    }
    //同步网络-更新
    synNetworkUpdate(network_syns: Array<Network_Syn>):Promise<any>{
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.syn.update");
        return this.restApi.request(api.method, api.url, null, null, network_syns);
    }
    //同步网络-禁用
    synNetworkDisable(network_syns: Array<Network_Syn>):Promise<any>{

        let ids = new Array<String>();
        network_syns.forEach((n)=>{ids.push(n.id)})
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.syn.disable");
        return this.restApi.request(api.method, api.url, null, null, ids);
    }




    updateNetworkDisplayName(network:Network):Promise<any>{
        
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.updatename");
        return this.restApi.request(api.method, api.url, null, null, {"id":network.id, "subnetDisplayName":network.networkDisplayName});
    }

    //企业下拉列表
    getTenants(platformId:string): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId
            }
        ];
        const api = this.restApiCfg.getRestApi('host-mng.openstack-mng.image.tenantlist');
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return Tenants_mock});
    }

     //数据字典
     ////网络类型
    typeDic = this.dict.get({
        owner: "NETWORK", 
        field: "TYPE"
    });
    //是否共享
    sharedDic  = this.dict.get({
        owner: "NETWORK", 
        field: "SHARED"
    });
    //运行状态
    stateDic = this.dict.get({
        owner: "NETWORK", 
        field: "STATE"
    });
    //状态
    statusDic = this.dict.get({
        owner: "NETWORK", 
        field: "STATUS"
    });
    //同步结果
    synDic = this.dict.get({
        owner: "NETWORK", 
        field: "SYNC"
    })
}