export class CreStep3Model {


    name : String; //名称
    displayName : String ; //显示名称
    hostnum : number;//宿主机 数量
    memSize : number;//总内存数
    vcpunum : number;//物理cpu总核数
    usageQuota : number; //云主机机配额
    description : String ;//说明
    // "id": "678eb96e-2593-4bbc-80aa-14910bff5df8",
    //   "platformId": "8b99ce42-6b42-4757-9b21-7a190ce14972",
    dcOrRegion: string;
    //   "displayName": "nova",
    //   "hostNum": 1,
    exceedPercentage: string;
    quotaPercentage: string;
    //   "status": 0,
    constructor() {
    }
}
