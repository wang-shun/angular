﻿class ProdDirSpec {
    "cpu": string;
    "mem": string;
    "bootStorageSize": string;
    "serviceId": string;
    "serviceName": string;
    constructor() {
        this.cpu = '';
        this.mem = '';
        this.bootStorageSize = '';
    }
}
class Proddir {
    createrName: string;
    creatorId: string;
    description: string;
    productNum: number;
    serviceId: string;
    serviceName: string;
    serviceType: string;
    serviceTemplateName: string;
    phyMachinePartsFlavors: Array<PartsFlavor>;
    specification: string;
    specContent: string;
    status: string;
    isSelected: boolean;
    dataBaseServiceTemplateSpecResp: DatabaseSpec;
    middleWareServiceTemplateSpecResp: {
        serviceTemplateId: string;
        serviceTemplateName: string;
        deploymentMode: string;
        version: string;
        middleWareType: string;       
    };
    constructor() {
        
    }
}
class DatabaseSpec {
    serviceTemplateId: string;
    serviceTemplateName: string;
    deploymentMode: number;
    version: string;
    dbType: number;
     constructor(){
            this.serviceTemplateId='';
        this.serviceTemplateName='';
        this.deploymentMode=0;
        this.version='';
        this.dbType=0;
        }
}
class PartsFlavor {
    "partFlavorNum": number;
    "partsCode": string;
    "partsDisplayName": string;
    "partsFlavorDisplayName": string;
    "partsFlavorValue": number;
    "partsFlavorValueDisplayName": string;
    "partsFlavorValueName": string;
    "partsId": string;
    "partsName": string;
    "specId": string;
    "specName": string;
    "capacity": number;
    selected: boolean;
    constructor() {
        this.partsFlavorValue = 0;
        this.partsId = '';
        this.partsName = '';
        this.specId = '';
        this.specName = '';
        this.partFlavorNum = 0;
        this.capacity = 0;
    }
}
export {
    ProdDirSpec,
    Proddir
}
