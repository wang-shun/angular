import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

//model
import { Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';

@Injectable()
export class CreateProdStepService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    product:Product=new Product();;
    productDir:ProductDir=new ProductDir();

    // 取得VM产品目录详情
    getVmProdDirDetail(id:string) {
        this.productDir=new ProductDir();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir-vm.detail");
        this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined).then(response => {
            console.log('VM产品目录详情', response);
            if (response && 100 == response.resultCode) {                
                this.productDir = response.resultContent;
                // this.product.serviceId=response.resultContent.serviceId;
                this.productDir.serviceType='0';
                this.productDir.platformInfo.forEach(platform=>{
                    platform.zoneList.forEach(zone=>{
                        zone.selected=false;
                    })
                })
                console.log(this.productDir);
                this.product=new Product();
            } else {

            }
        }).catch(err => {
            console.error(err)
        });
    }
    // 取得Disk产品目录详情
    getDiskProdDirDetail(id:string) {
        this.productDir=new ProductDir();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir-disk.detail");
        this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined).then(response => {
            console.log('DISK产品目录详情', response);
            if (response && 100 == response.resultCode) {                
                this.productDir = response.resultContent;
                // this.product.serviceId=response.resultContent.serviceId;
                this.productDir.serviceType='1';
                this.productDir.platformList.forEach(platform=>{
                    platform.zoneList.forEach(zone=>{
                        zone.selected=false;
                    })
                })
                console.log(this.productDir);
                this.product=new Product();
            } else {

            }
        }).catch(err => {
            console.error(err)
        });
    }

   
}