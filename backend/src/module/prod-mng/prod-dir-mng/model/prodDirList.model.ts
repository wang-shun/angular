﻿class ProdDirSpec{
      "cpu": string;
      "mem": string;
      "bootStorageSize": string;
    }
 class Proddir {
    createrName: string;
    creatorId: string;
    description: string;
    productNum: number;
    serviceId: string;
    serviceName: string;
    serviceTemplateName: string;
    specification:string;
    status: string;
    isSelected : boolean;
    constructor() {
    }
}
export{
    ProdDirSpec,
    Proddir
}
