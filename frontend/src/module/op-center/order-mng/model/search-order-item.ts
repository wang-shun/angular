import {ProductBillingItem} from '../model'

export class SearchOrderItem{
	id:string = null;
	
    orderNo :string = null; //编号
    orderId : string = null; //订单号
    serviceType : string = null; //产品类型
    orderType : number = null;//订单类型
    status : string = null; //订单状态

    submitTime: string = null;// 提交时间 ,
    EndTime: string = null;// 完成时间 ,

    submitPeople: string = null;//提交者
     
    departmentName: string = null;//所属部门
    oncePrice : string = null;//一次性费用
    price: string = null;//费用
    periodType : number = null;//费用单位

    statusName: string = null;//用于界面显示
    serviceTypeName: string = null;//产品类型名称

    withDrawOrderFlag : number = 0;//撤单标志，默认0不能撤单，1可以撤单
    subinstanceId:string;//实例Id
    
}
