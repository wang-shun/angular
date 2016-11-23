export class StdNet {
    selected: boolean = false;
    nameEditing: boolean;
    id: string = "";
    dcId:string = "";
    dcName: string = ""; //数据中心
    clusterId: string;
    clusterName: string = "";//可用区（集群）名称
    clusterDisplayName: string;//可用区显示名称
    portGroupId: string;
    portDisplayName: string;//标准端口组显示名称
    portGroupName: string;//标准端口组名称
    vlanId: string;//VLANID
    status: string; //状态，来源数据字典
    lastUpdate: string;
}