
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { LayoutService, NoticeComponent, ConfirmComponent, Validation } from '../../../../architecture';

import { cartListService } from '../service/cart-list.service'
import { CartList } from '../model/cart-list.model';
import { TotalPrice } from '../model/cart-total-price.model';

@Component({
	selector: 'cart-list',
	templateUrl: '../template/cart-list.component.html',
	styleUrls: ['../style/cart-list.less'],
})

export class cartListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('cart') private cart:any;
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	totalPrice : TotalPrice = new TotalPrice();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cartListService,
		private location: Location
	) {}

	ngOnInit() {
	}

	private setTotalPrice(orderList:any[]) {   //设置价格总价
		let billingArr = {},
			unitArr = {},
			oncePrice:number = 0;

		// orderList.forEach(order => {
			orderList.forEach(item => {
				oncePrice += item.billingInfo.basePrice;
				if(item.billingInfo.periodType) {
					if(!billingArr[item.billingInfo.periodType]) billingArr[item.billingInfo.periodType] = 0;  //计算周期价格
					billingArr[item.billingInfo.periodType] += item.billingInfo.basicPrice + item.billingInfo.cyclePrice; 
				}
				if(item.billingInfo.unitType){
					if(!unitArr[item.billingInfo.unitType]) unitArr[item.billingInfo.unitType] = 0;  //计算周期价格
					unitArr[item.billingInfo.unitType] += item.billingInfo.unitPrice; 
				}
			})
		// });
		this.totalPrice.oncePrice = oncePrice;
		this.totalPrice.billingArr = billingArr;
		this.totalPrice.unitArr = unitArr;
		console.log(this.totalPrice)
	}


	buyNow():void {
		const list = this.cart.cartList.map(cart => cart.id);   //提取cartID
		if(!list.length) return this.noticeDialog.open("提示","购物车中没有订单");

		this.layoutService.show();
		this.service.purchaseCart(list).then(res => {
			this.layoutService.hide();
			this.noticeconfirm = function(){
				this.router.navigate(['cloud-host-service/cart-order/', JSON.stringify(res)]);
			}
			this.noticeDialog.open("","SHOPPING_CART.PURCHASE_SUCCESS");
		}).catch(e => {
			this.noticeDialog.open("SHOPPING_CART.PURCHASE_FAILED",e);
		})
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}

	modalconfirm = function(){};
	modalCANCEL = function(){};
	noticeconfirm = function(){};

	
}