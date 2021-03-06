//订单查询详情subinstanceId

import { PhysicalMachine } from './';

export class SearchOrderDetail{
	billingPerson: string = null;//, optional): 提交者 ,
	billingPersonId: string = null;//, optional): 提交者ID ,
	completeDate: string = null;//, optional): 完成时间 ,
	createDate: string = null;//, optional): 创建时间 ,
	department: string = null;//, optional): 部门 ,
	departmentId: string = null;//, optional): 部门ID ,
	enterpirse: string = null;//, optional): 企业 ,
	enterpirseId: string = null;//, optional): 企业ID ,
	id: string = null;//, optional): 订单ID ,
	orderCode: string = null;//, optional): 订单编号 ,
	productType: string = null;//, optional): 产品类型 ,
	status: number = null;//, optional): 订单状态 ,
	productTypeName:string = null;
	statusName:string = null;
	type:number = null;//订单类型??
	typeName:string = null;//订单类型
  subinstanceId:string;//实例Id
	extendType:string;//自动续订方式
	orderInstanceItems:[{//订单中的产品信息
		departmentName: string;//, optional): 所属部门 ,
		desc: string;//, optional): 说明 ,
		operation: string;//, optional): 操作 ,
		operator: string;//, optional): 执行者 ,
		status: string;//, optional): 订单状态
		statusName:string;

	}]; //(Array[OrderHistoryItem], optional):  ,
	subInstanceList:Array<SubInstanceItemResp1>;//已购服务
}

export class SubInstanceItemResp1{
	billingInfo: {
		basePrice: number;//, optional): 一次性价格 ,
		basicPrice: number;//, optional): 周期计费-基础周期价格 ,
		billingId: string;//, optional): 产品计费ID ,
		billingMode: number;//, optional): 计费类型，需要检索数据字典 ,
		cyclePrice: number;//, optional): 周期计费-增量周期价格 ,
		periodType: string;//, optional): 周期计费-周期类型，需要检索数据字典 ,
		unitPrice: number;//, optional): 流量计费-流量单价 ,
		unitType: number;//, optional): 流量计费-流量计费类型，需要查询数据字典
	}//, optional): 产品计费详细信息 ,
	buyer: string;//, optional): 订购人 ,
	createDate: string;//, optional): 创建时间 ,
	departmentName: string;//, optional): 订购人所属部门名称 ,
	expireDate: string;//, optional): 过期时间 ,
	instanceName: string;//, optional): 实例名称 ,
	period: number;//, optional): 购买周期 ,
	quantity: number;//, optional): 订购数量 ,
	serviceType: string;//, optional): 产品类型 ,
	serviceTypeName:string;
	specList:[{
		attrCode: string;//, optional): 服务属性Code ,
		attrDisplayName: string;//, optional): 服务属性页面显示的名称 ,
		attrDisplayValue: string;//, optional): 服务属性值显示值 ,
		attrOrderSeq: number; //, optional): 属性显示顺序, 如果为空，则忽略 ,
		attrValueCode: string;//, optional): 服务属性值Code ,
		description: string;//, optional): 其他描述性内容，非不要 ,
		valueUnit: string;//, optional): 服务属性值的单位
	}];//[SubInstanceAttrPair], optional): 产品规格 ,
	status: string;//, optional): UI订单状态，需要查询数据字典

  platform:string;
  privateIp:string;
  publicIp:string;
  osType:string;
  pmEntity:PhysicalMachine= new PhysicalMachine();
  showSpecList:boolean = false;//已购服务配置和订单查询配置不一致
  //一次性费用
  get oneTimePrice():number{
    if(this.billingInfo)
    {
      return this.billingInfo.basePrice
    }
    else
      return null;
  }

  //费用
  get price():number{
    if(this.billingInfo)
    {
      if(this.billingInfo.billingMode == 0)//包年包月
      {
        // return this.billingInfo.basicPrice + this.billingInfo.cyclePrice;
				return this.billingInfo.basicPrice;//周期费用
      }
      else if(this.billingInfo.billingMode == 1)//一次性费用
      {
        return this.billingInfo.unitPrice;
      }
      else
        return null;
    }
    else
      return null;
  }
	
//按次计费不显示费用
    get showPrice(){
      if(this.billingInfo){
          return this.billingInfo.billingMode==3 ? false : true;
      }
      return   true;
    }
		
  	//总费用- 一次性费用
     get totalOncePrice():number{
    if(this.billingInfo)
    {
      return this.billingInfo.basePrice*this.quantity;
    }
    else
      return null;
  }
  //总费用- 费用
  get totalPrice():number{
    if(this.billingInfo)
    {
      if(this.billingInfo.billingMode == 0)//云主机
      {
        return this.billingInfo.basicPrice*this.quantity*this.period;
      }
      else if(this.billingInfo.billingMode == 1)//云硬盘
      {
        return this.billingInfo.unitPrice*this.quantity*this.size;
      }
      else
        return null;
    }
    else
      return null;
  }
	//云硬盘容量
	get size():number{
      if(this.specList){
				for(let item of this.specList){
					if(item.attrCode=='DISKSIZE'){
							console.log(parseInt(item.attrDisplayValue));
							return parseInt(item.attrDisplayValue);
					}
					
					
				}
			}
      return null;		
	}
}

//管理服务-查看实例详情中的云主机
export class VirtualMachine{
		platform:string//平台
		zone:string;//可用区
		instanceName:string;//云主机名称
		cpu:string;//配置（cpu,内存,启动盘）
		mem:string;	
		bootstorage:string;
		image:string;//镜像
		privateIp:string;//内部IP
		publicIp:string;//外部IP
}
export class DiskMachine{//云硬盘
		platform:string//平台
		zone:string;//可用区
		instanceName:string;//云硬盘名称
		storageType:string;//存储类型
		capacity:string;//云硬盘容量
		status:string;//状态
		mount:string;//挂载位置
		property:string;//属性
}
// export class PhysicalMachine{//物理机
// 		region:string//地域
// 		dataCenter:string;//数据中心
// 		instanceName:string;//物理机名称
// 		cpu:string;//配置（cpu,内存,磁盘信息）
// 		mem:string;	
// 		diskInfo:string;
// 		image:string;//镜像
// 		privateIp:string;//私网IP
// 		publicIp:string;//公网IP
// }
/*

OrderDetailItem {
billingPerson (string, optional): 提交者 ,
billingPersonId (string, optional): 提交者ID ,
completeDate (string, optional): 完成时间 ,
createDate (string, optional): 创建时间 ,
department (string, optional): 部门 ,
departmentId (string, optional): 部门ID ,
enterpirse (string, optional): 企业 ,
enterpirseId (string, optional): 企业ID ,
id (string, optional): 订单ID ,
orderCode (string, optional): 订单编号 ,
orderInstanceItems (Array[OrderHistoryItem], optional): 订单中的产品信息 ,
productType (string, optional): 产品类型 ,
status (string, optional): 订单状态 ,
subInstanceList (Array[SubInstanceItemResp], optional): 已购服务
}
OrderHistoryItem {
departmentName (string, optional): 所属部门 ,
desc (string, optional): 说明 ,
operation (string, optional): 操作 ,
operator (string, optional): 执行者 ,
status (string, optional): 订单状态
}
SubInstanceItemResp {
billingInfo (ProductBillingItem, optional): 产品计费详细信息 ,
buyer (string, optional): 订购人 ,
createDate (string, optional): 创建时间 ,
departmentName (string, optional): 订购人所属部门名称 ,
expireDate (string, optional): 过期时间 ,
instanceName (string, optional): 实例名称 ,
period (integer, optional): 购买周期 ,
quantity (integer, optional): 订购数量 ,
serviceType (string, optional): 产品类型 ,
specList (Array[SubInstanceAttrPair], optional): 产品规格 ,
status (string, optional): UI订单状态，需要查询数据字典
}
ProductBillingItem {
basePrice (number, optional): 一次性价格 ,
basicPrice (number, optional): 周期计费-基础周期价格 ,
billingId (string, optional): 产品计费ID ,
billingMode (string, optional): 计费类型，需要检索数据字典 ,
cyclePrice (number, optional): 周期计费-增量周期价格 ,
periodType (string, optional): 周期计费-周期类型，需要检索数据字典 ,
unitPrice (number, optional): 流量计费-流量单价 ,
unitType (number, optional): 流量计费-流量计费类型，需要查询数据字典
}
SubInstanceAttrPair {
attrCode (string, optional): 服务属性Code ,
attrDisplayName (string, optional): 服务属性页面显示的名称 ,
attrDisplayValue (string, optional): 服务属性值显示值 ,
attrOrderSeq (integer, optional): 属性显示顺序, 如果为空，则忽略 ,
attrValueCode (string, optional): 服务属性值Code ,
description (string, optional): 其他描述性内容，非不要 ,
valueUnit (string, optional): 服务属性值的单位
}
*/