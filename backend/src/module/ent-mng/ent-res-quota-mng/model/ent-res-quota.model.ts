﻿export class EntResQuota {
    id: String;
    enterpriseId: String;
    platformId: String;
    platformStorageQuota: number;
    platformVMQuota: number;
    regionId: String;
    regionName: String;
    vmQuota: number;
    storageQuota: number;
    networkQuota: number;

    constructor() {
    }

    toString(): String {
        return this.id + "\r\n" +
            this.enterpriseId + "\r\n" +
            this.platformId + "\r\n" +
            this.platformStorageQuota + "\r\n" +
            this.platformVMQuota + "\r\n" +
            this.regionId + "\r\n" +
            this.regionName + "\r\n" +
            this.vmQuota + "\r\n" +
            this.storageQuota + "\r\n" +
            this.networkQuota;
    }
}