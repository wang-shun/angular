
import { Component,ViewChild,Input , Output,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, Validation, ValidationRegs } from '../../../../architecture';
import { cloudHostServiceList } from '../service/cloud-host-list.service'

import { ListOptions } from '../model/options.model';
import { VmList, HandleVm, QuiryVmList } from '../model/vm-list.model';
import { VMInstanceLabelItem } from '../model/labe-iItem.model';

@Component({
	selector: 'cloud-host-list',
	templateUrl: '../template/cloud-host-list.component.html',
	styleUrls: ['../style/cloud-host-list.less'],
})

export class cloudHostListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;


	@ViewChild('platformZone') platformZone;

	@ViewChild('hostReconfig') hostReconfig;

	@Input() options:ListOptions;

	list : QuiryVmList = new QuiryVmList();
	saveList : QuiryVmList = new QuiryVmList();   //储存点，重置搜索时会返回到这个点

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	radioSelected:VmList = new VmList; //选择的vm主机
	forceDelect: boolean = false;  //是否强制删除

	areaConfig = [];   //区域
	superSearch: boolean = false;   //高级搜索开关
	vmList: VmList[] = [];   //主机
	handleData: HandleVm;   //发送操纵云主机的数据
	labelItem:VMInstanceLabelItem[] = [];

	email:string;
	phone:string;
	password:string;
	passwordCheck:string;
	username:string;
	numberRange:string;
	baseInput:string;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private v: Validation,
		private service: cloudHostServiceList
	) {
		this.handleData = new HandleVm();

		this.service.computeStatus.then(res => {
			console.log(res,  2222)
		})
	}
	ngOnInit() {
		
		this.setHostList();
		this.getLabels();  //获取标签列表
		this.initSelect();

	}

	checkForm(key?:string) {
		let regs:ValidationRegs = {
			email: [this.email, [this.v.isEmail], "Email输入不正确"],
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
			phone: [this.phone, [this.v.isMoblie], "手机号码输入不正确"],
			password: [this.password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
			passwordCheck: [this.passwordCheck, [this.v.equalTo(this.password)], "两次密码输入不一致"],
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
		}

		return this.v.check(key, regs);
	}

	submitForm() {
		var errorMessage = this.checkForm();
		if(errorMessage) return alert(errorMessage);
		console.log("通过！");
	}

	setHostList(): void {
		this.service.getHostList(this.list).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			return res.resultContent;
			
		}).then(list => {
			this.vmList = list;
		}).catch(error => {
			// this.layoutService.hide();
		});
	};

	initSelect(){
		this.service.queryField.then(arr => this.list.queryField = arr[0].code);
	}

	getLabels() {
		this.service.getLabels().then(res => {
			this.labelItem = res;
		})
	}

	resetSearch(){   //重置搜索
		this.list = Object.assign({}, this.saveList);
		this.initSelect();
	}
	search() {    //搜索
		console.log(this.list)

		this.setHostList();
	}

	platformClick(data) {   //选择区域列表
		this.list.platformId = data.area.id;
		this.list.zoneId = data.zone.zoneId;
		this.saveList.platformId = data.area.id;
		this.saveList.zoneId =  data.zone.zoneId;
		this.setHostList();
	}


	//云主机的操作相关
	handleVm(key: string, vm: VmList ,msg) {
		this.layoutService.show();

		this.handleData.id = vm.uuid;
		this.handleData.actions = key;
		this.handleData.enterpriseIds.platformId = vm.platformId;
		this.handleData.enterpriseIds.enterpriseId = this.service.userInfo.enterpriseId;

		this.service.handleVm(this.handleData).then(res => {
			this.layoutService.hide();
			// alert(msg+"成功！");
			this.showNotice("COMMON.CLOUD_HOST_OPERATION" ,"COMMON.SUCCESS");

			setTimeout(() => {   //延迟4秒执行 因为后端4秒同步一次状态
				this.setHostList();
			},5000)
		}).catch(error => {
			this.layoutService.hide();
		})
	}



	goTo(url : string) {
		this.router.navigateByUrl(url);
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

	changeName(name, vm:VmList) {
		this.layoutService.show();
		this.service.postVmInfo(vm.itemId, {instanceDisplayName : name}).then(res => {
			this.layoutService.hide();
			this.setHostList();
		}).catch(error => {
			this.layoutService.hide();
			this.showNotice("提示", "修改名称失败")
		})
	}
	nameClick(){
		console.log("222")
	}

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.list.pageParameter.totalPage ? this.list.pageParameter.totalPage : page;

		if (this.list.pageParameter.currentPage + 1 == page) {
			return;
		}

		this.list.pageParameter.currentPage = page - 1;
		this.setHostList();
	}
}