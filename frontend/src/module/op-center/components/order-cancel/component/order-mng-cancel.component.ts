	
import { Input,Component, OnInit, ViewChild, EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../../architecture';
import {ProductBillingItem,OrderDetailItem, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp} from '../../../order-mng/model'

import { OrderCancelService } from '../service/order-cancel.service';

@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/order-mng-cancel.component.html',
	styleUrls: ['../../../order-mng/style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngCancelComponent implements OnInit{

	@Input()
	private detail : OrderDetailItem = new OrderDetailItem();

	 @Output()  complete=new EventEmitter(); 

	private _param:OrderMngParam = new OrderMngParam();
	private _orderId:string = null;
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private service:OrderCancelService,
		private restApi:RestApi,){
	}
	ngOnInit(){
	}


	selectedCancelItem(item:OrderDetailItem){
      item.isChecked=!item.isChecked;
	  let price = item.oneTimePrice;
	  price = item.price;
	}
	selectedSubItem(item:SubInstanceResp){
		item.isChecked=!item.isChecked;
	}
	cancel() {
		// alert("cancel页面");
		this.complete.emit([this.detail.itemList,this.detail]);
	}
  
    getBillingMode(){
		if(this.detail.relatedSubInstanceList&&this.detail.relatedSubInstanceList[0]){
			return this.detail.relatedSubInstanceList[0].productBillingItem.billingMode?this.detail.relatedSubInstanceList[0].productBillingItem.billingMode:null;
		}
		return null;

	}
	getOneTimePrice(){
		if(this.detail.relatedSubInstanceList&&this.detail.relatedSubInstanceList[0]){
			return this.detail.relatedSubInstanceList[0].productBillingItem.basePrice?this.detail.relatedSubInstanceList[0].productBillingItem.basePrice:null;
		}
		return null;
	}
	getPrice(){
		if(this.detail.relatedSubInstanceList&&this.detail.relatedSubInstanceList[0]){
			return this.detail.relatedSubInstanceList[0].productBillingItem.cyclePrice?this.detail.relatedSubInstanceList[0].productBillingItem.cyclePrice:null;
		}
		return null;
	}
	getPeriodType(){
		if(this.detail.relatedSubInstanceList&&this.detail.relatedSubInstanceList[0]){
			return this.detail.relatedSubInstanceList[0].productBillingItem.periodType?this.detail.relatedSubInstanceList[0].productBillingItem.periodType:null;
		}
		return null;
	}
}