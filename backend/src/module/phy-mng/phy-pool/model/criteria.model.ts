export class Criteria{
    poolName: string;
    region: string;
    dataCenter: string;
    description: string;

    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}
/*
{
    "criteriaQuery": {
    "poolName": "北京地区-物理资源池1",
        "region": "北京",
        "dataCenter": "朝阳数据中心"
}
}*/
