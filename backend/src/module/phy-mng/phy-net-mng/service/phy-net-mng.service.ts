import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model 
import { PhyNetListModel, PhyNetCreateModel, PhyNetEditModel, IpScopeModel } from '../model/phy-net.model';

import { PhyNetListModel_mock } from '../model/phy-net.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhyNetMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,        
        private dict: SystemDictionaryService,
    ) { }

    getPhyNetList(pageIndex: number, pageSize: number): Promise<any> {        
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
        /*
        const body = {
                "subnetCIDR": subn.subnetCIDR,
                "subnetMask": subn.subnetMask,
                "gateway": subn.gateway,
                "dnsPre": subn.dnsPre,
                "dnsAlt": subn.dnsAlt
        };
        */
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

    createPhyNet(phynet: PhyNetCreateModel): Promise<any> {
        const body = {
            "dnsAlt": phynet.dnsAlt,
            "dnsPre": phynet.dnsPre,
            "gateway": phynet.gateway,
            "networkName": phynet.networkName,
            "subnetIP": phynet.subnetIP,
            "subnetMask": phynet.subnetMask
        };
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.create");
        return this.restApi.request(api.method, api.url, null, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

    editPhyNet(phynet: PhyNetEditModel): Promise<any> {
        const body = {
            "id": phynet.id,
            "dnsAlt": phynet.dnsAlt,
            "dnsPre": phynet.dnsPre,
            "gateway": phynet.gateway,
            "networkName": phynet.networkName,
            "subnetIP": phynet.subnetIP,
            "subnetMask": phynet.subnetMask
        };
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.edit");
        return this.restApi.request(api.method, api.url, null, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

    updateStatusPhyNet(pmNetworkId:string, status:number): Promise<any> {
       const pathParams = [
            {
                key: "pmNetworkId",
                value: pmNetworkId
            },
            {
                key: "status",
                value: status
            }
        ];
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.status.set");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

    getPhyNetIpRange(pmNetworkId: string): Promise<any> {
       const pathParams = [
            {
                key: "pmNetworkId",
                value: pmNetworkId
            }
        ];
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.iprange.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

    updatePhyNetIpRange(ipscope: IpScopeModel): Promise<any> {
       const pathParams = [
            {
                key: "pmNetworkId",
                value: ipscope.id
            }
        ];
        const body = {
            "id": ipscope.id,
            "dnsAlt": ipscope.dnsAlt,
            "dnsPre": ipscope.dnsPre,
            "gateway": ipscope.gateway,
            "networkName": ipscope.networkName,
            "subnetIP": ipscope.subnetIP,
            "subnetCIDR": ipscope.subnetCIDR,
            "subnetMask": ipscope.subnetMask,
            "ipRange": ipscope.ipRange
        };
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.iprange.set");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }

}
