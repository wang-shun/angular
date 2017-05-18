
import { Component,ViewChild,Input , Output,  OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { PhysicalMachineListService } from '../service/physical-machine-list.service'

import { PMServiceItem } from "../model/service.model"

@Component({
	selector: 'physical-machine-list',
	templateUrl: '../template/physical-machine-list.component.html',
	styleUrls: ['../style/physical-machine-list.less'],
})

export class PhysicalMachineListComponent implements OnInit, OnDestroy {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	destroyed: boolean;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	pmListQuery: any = {};
	currentPage: number = 1;
	totalPage: number = 0;
	list:PMServiceItem[] = [];

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: PhysicalMachineListService
	) {

	}
	ngOnInit() {
		this.fetchPMList()
	}

	ngOnDestroy() {
		this.destroyed = true;
	}


	goTo(url : string) {
		this.router.navigateByUrl(url);
	}


	isMiddleState(state) {
		return !!["0", "2", "3", "4", "5", "6", "8", "9", "11", "13" ].filter(v => v==state).length
	}

	checkListMiddleState() {
		if(this.destroyed) return false;  //如果组件被销毁了 return

		// let mkPromise = (disk) => this.isMiddleState(disk.status) ? this.service.fetchDiskState(disk.itemId) : false
		// let fecthMiddleStateList = this.distList.map(mkPromise)

		// if(!fecthMiddleStateList.filter(l => l).length) return false;   //如果没有中间状态了 则不再循环

		// Promise.all(fecthMiddleStateList).then(res => {
		//	res.forEach((disk, i) => {
		//		if(disk) this.distList[i].status = disk.diskState
		//	})
		//	setTimeout(this.checkListMiddleState.bind(this) , 10 * 1000)
		// })
	}

	fetchPMList() {
		this.layoutService.show()
		this.service.fetchPMList(this.currentPage, this.pmListQuery)
            .then(res => {
                if(res.resultCode !== "100"){
                    throw "获取列表失败";
                }
                this.totalPage = res.pageInfo.totalPage
                return res.resultContent;
            })
			.then(res => {
				this.layoutService.hide()
				this.list = res;
			})
			.catch(e => this.layoutService.hide())
	}

	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}

	modalAction(btnType: number) {
	    if (btnType == 0) {
	      this.noticeDialog.close();
	      return;
	    }
	    
	    this.noticeDialog.close()
	    this.confirmDialog.close();
	}
	// 警告框相关结束

	changeName(name) {
		
	}

	regionClick(event) {
		console.log(event)
	}

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.totalPage ? this.totalPage : page;

		if (this.currentPage == page) {
			return;
		}

		this.currentPage = page;
		this.fetchPMList();
	}
}