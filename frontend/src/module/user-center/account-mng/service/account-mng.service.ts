import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 获取帐号列表
    getAccountList(page : number , size : number) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.list");

        return this.restApi.request(api.method, api.url, [{key : "page", value : page},{key : "size" , value : size}], undefined);
    }
    //获取账号详情
    getLocalAcc (id : string){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.detail");

        return this.restApi.request(api.method,api.url,[{key : "id", value : id}],undefined);
    }
    // 启用帐号 user-center.account-mng.enableAcc
    enableAcc (id : string){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.enableAcc");

        return this.restApi.request(api.method,api.url,[{key : "id", value : id}],undefined);
    }

    // 禁用帐号 user-center.account-mng.disableAcc
    disableAcc (id : string){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.disableAcc");

        return this.restApi.request(api.method , api.url , [{key : "id" ,value : id}],undefined);
    }

    //删除帐号 user-center.account-mng.deleteAcc
    deleteAcc ( id : string){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.deleteAcc");

        return this.restApi.request(api.method , api.url , [{key : "id" ,value : id}],undefined);
    }

    // 获取所有角色列表
    getRoleList(){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.create.roleList");

        return this.restApi.request(api.method , api.url , [{key : "page", value : 0},{key : "size", value : 99999}],undefined);
    }
    //获取部门列表
    getOrgList(){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.create.orgList");

        return this.restApi.request(api.method , api.url , [{key : "page", value : 0},{key : "size", value : 10}],undefined);
    }
    //创建账户
    createAccount(data:any){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.create.post");

        return this.restApi.request(api.method , api.url , [],undefined,data);
    }
    //编辑本地账户
    editAccount(id:string,data:any){
        let api = this.restApiCfg.getRestApi("user-center.account-mng.editLocal");

        return this.restApi.request(api.method , api.url , [{key:'id',value:id}],undefined,data);
    }
}