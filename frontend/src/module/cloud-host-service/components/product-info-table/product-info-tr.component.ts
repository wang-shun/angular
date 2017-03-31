import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { ProductInfoTableService } from './product-info-table.service'

import { CartOrder,itemList } from '../../shoping-cart/model/cart-order.model';
import { TotalPrice } from '../../shoping-cart/model/cart-total-price.model';


@Component({
	selector: '[product-info-tr]',
	templateUrl: './product-info-tr.component.html',
	styleUrls: ['./product-info-table.less']
})
export class ProductInfoTrComponent implements OnInit {

	totalPrice : TotalPrice = new TotalPrice();

	@Input("itemList") itemList : any[];     //orderList和orderId 设置一个
	@Input("hasSelect") hasSelect : boolean = false;
	@Input("disabled") disabled : boolean = false;

	@Output("onSelect") onSelect = new EventEmitter;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : ProductInfoTableService
	) {
	};

	ngOnInit() {
		// this.layoutService.show();
		this.selectedSubItem();
	}

	selectedSubItem() {
		let selectedList = this.itemList.filter(item => item.selected);

		this.onSelect.emit(selectedList);
	}

	private setTotalPrice(itemList:any[]) {   //设置价格总价
		// let billingArr = {},
		// 	unitArr = {},
		// 	oncePrice:number = 0;

		// 	this.itemList.forEach(item => {
		// 		oncePrice += item.billingInfo.basePrice;
		// 		if(item.billingInfo.basicPrice) {   //主机价格计算
		// 			if(!billingArr[item.billingInfo.periodType]) billingArr[item.billingInfo.periodType] = 0;  //计算周期价格
		// 			billingArr[item.billingInfo.periodType] += item.billingInfo.basicPrice * item.quantity * item.billingPeriod; 
		// 		}
		// 		if(item.billingInfo.unitPrice){
		// 			if(!unitArr[item.billingInfo.periodType]) unitArr[item.billingInfo.periodType] = 0;  //计算周期价格
		// 			unitArr[item.billingInfo.periodType] += item.billingInfo.unitPrice; 
		// 		}
		// 	})
		// this.totalPrice.oncePrice = oncePrice;
		// this.totalPrice.billingArr = billingArr;
		// this.totalPrice.unitArr = unitArr;
		console.log(this.totalPrice)
	}


}
