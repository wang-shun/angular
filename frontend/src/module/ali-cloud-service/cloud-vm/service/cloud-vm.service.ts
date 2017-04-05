import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel } from '../../cloud-disk/model/cloud-disk.model';
import { orderVmPageModel, QuantityModel, instanceListModel } from "../model/cloud-vm.model";

@Injectable()
export class AliCloudVmService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    keysecret: keysecretModel = new keysecretModel();
    quantity: Array<QuantityModel> = [
        {
            displayValue: "1",
            monthnum: 1
        },
        {
            displayValue: "2",
            monthnum: 2
        },
        {
            displayValue: "3",
            monthnum: 3
        },
        {
            displayValue: "4",
            monthnum: 4
        },
        {
            displayValue: "5",
            monthnum: 5
        },
        {
            displayValue: "6",
            monthnum: 6
        },
        {
            displayValue: "7",
            monthnum: 7
        },
        {
            displayValue: "8",
            monthnum: 8
        },
        {
            displayValue: "9",
            monthnum: 9
        },
        {
            displayValue: " 1",
            monthnum: 12
        },
        {
            displayValue: " 2",
            monthnum: 24
        },
        {
            displayValue: " 3",
            monthnum: 36
        },
    ];

    getImages(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
             "accessinfo": {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
             },
             "pageNumber": 1,
             "pageSize": 100
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.image.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceTypeFamily(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.type.family.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceType(regionid: string): Promise<any> {
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.type.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    getInstanceFamilyTree(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.family.tree.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getVPCs(regionid: string) : Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            //"isDefault": "",
            "pageNumber": "1",
            "pageSize": "50",
            "vpcId": ""
            }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vpc.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getVSwitches(vpcid: string) : Promise<any> {
        const pathParams = [
            {
                key: "vpcid",
                value: vpcid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vswitch.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    calculatePrice(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        let body;
        if (selectedOrderVmPage.selectedChargeType == "PostPaid") { //按量计费，多传一个traffic-bandwidth
            body = [
                {
                    "orderType": "traffic-bandwidth",
                    "regionId": selectedOrderVmPage.RegionId
                },
                {
                    "orderType": "instance-buy",
                    "regionId": selectedOrderVmPage.RegionId,
                    "commodity": {
                        "amount": 1,
                        "autoRenew": selectedOrderVmPage.renew,

                        "instanceType": selectedOrderVmPage.selectedChargeType,
                        "internetChargeType": selectedOrderVmPage.selectedInternetChargeType,
                        "internetMaxBandwidthOut": selectedOrderVmPage.selectedInternetMaxBandwidthOut,
                        "ioOptimized": true,
                        "maxAmount": 1,
                        "networkType": selectedOrderVmPage.selectedInternetChargeType,
                        "period": selectedOrderVmPage.period,
                        "periodType": selectedOrderVmPage.periodType,
                        "priceUnit": selectedOrderVmPage.priceUnit,
                        "securityGroupId": null,
                        "systemDisk": {
                            "category": selectedOrderVmPage.selectedDisk,
                            "size": selectedOrderVmPage.diskCount
                        },
                        "zoneId": selectedOrderVmPage.selectedArea.ZoneId
                    },
                }
            ];
        } else if (selectedOrderVmPage.selectedChargeType == "PrePaid") { //包年包月，只传一个instance-buy
            body = [
                {
                    "orderType": "disk-buy",
                    "regionId": selectedOrderVmPage.RegionId,
                    "commodity": {
                        "amount": 1,
                        "autoRenew": selectedOrderVmPage.renew,

                        "instanceType": selectedOrderVmPage.selectedChargeType,
                        "internetChargeType": selectedOrderVmPage.selectedInternetChargeType,
                        "internetMaxBandwidthOut": selectedOrderVmPage.selectedInternetMaxBandwidthOut,
                        "ioOptimized": true,
                        "maxAmount": 1,
                        "networkType": selectedOrderVmPage.selectedInternetChargeType,
                        "period": selectedOrderVmPage.period,
                        "periodType": selectedOrderVmPage.periodType,
                        "priceUnit": selectedOrderVmPage.priceUnit,
                        "securityGroupId": null,
                        "systemDisk": {
                            "category": selectedOrderVmPage.selectedDisk,
                            "size": selectedOrderVmPage.diskCount
                        },
                        "zoneId": selectedOrderVmPage.selectedArea.ZoneId
                    },
                }
            ];            
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.price.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    createInstanceOrder(orderVmPage: orderVmPageModel): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: orderVmPage.RegionId
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "instanceType": orderVmPage.selectedInstanceType,
            "imageId": orderVmPage.selectedImage,
            
  //"autoRenew": "",
  //"autoRenewPeriod": "",
  //"clientToken": "",
  "dataDisk1Category": "",
  "dataDisk1Description": "",
  "dataDisk1Device": "",
  "dataDisk1DiskName": "",
  "dataDisk1Size": "",
  "dataDisk1SnapshotId": "",
  "dataDisk2Category": "",
  "dataDisk2Description": "",
  "dataDisk2Device": "",
  "dataDisk2DiskName": "",
  "dataDisk2Size": "",
  "dataDisk2SnapshotId": "",
  "dataDisk3Category": "",
  "dataDisk3Description": "",
  "dataDisk3Device": "",
  "dataDisk3DiskName": "",
  "dataDisk3Size": "",
  "dataDisk3SnapshotId": "",
  "dataDisk4Category": "",
  "dataDisk4Description": "",
  "dataDisk4Device": "",
  "dataDisk4DiskName": "",
  "dataDisk4Size": "",
  "dataDisk4SnapshotId": "",
  "description": "",
  "hostName": "",
  "instanceChargeType": orderVmPage.selectedChargeType,
  "instanceName": orderVmPage.InstanceName,
  "internetChargeType": orderVmPage.selectedInternetChargeType,
  "internetMaxBandwidthIn": orderVmPage.selectedInternetMaxBandwidthIn,
  "internetMaxBandwidthOut": orderVmPage.selectedInternetMaxBandwidthOut,
  "ioOptimized": "",
  "nodeControllerId": "",
  "password": orderVmPage.Password,
  "period": "",
  "privateIpAddress": "",
  "securityGroupId": "",
  "systemDiskCategory": orderVmPage.selectedDisk,
  "systemDiskDescription": "",
  "systemDiskDiskName": "",
  "systemDiskSize": orderVmPage.diskCount,
  "userData": "",
  "vswitchId": orderVmPage.selectedNetworkId,
  "zoneId": orderVmPage.selectedArea.ZoneId

        }
        console.log(body, "order vm body")
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.create");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceList(pageIndex: number, pageSize: number, regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "pageNumber": pageIndex,
            "pageSize": pageSize
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.list");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    deleteInstance(instance: instanceListModel) : Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    startInstance(instance: instanceListModel): Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.start");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    stopInstance(instance: instanceListModel): Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.stop");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }



}