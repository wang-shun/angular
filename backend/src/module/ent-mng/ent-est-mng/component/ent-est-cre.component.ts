import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEst, ResourceQuota } from '../model'
import { EntEstCreService, Paging } from '../service/ent-est-cre.service'

@Component({
	selector:'ent-est-cre'
	,templateUrl:'../template/ent-est-cre.component.html'
	,styleUrls:['../style/ent-est-mng.component.css']
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreComponent implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEst: EntEst = null;
	private currencyTypes : Array<SystemDictionary> = null;
	private resourceQuotas: Paging<ResourceQuota> = new Paging<ResourceQuota>();
	private isLocal:boolean = true;

	constructor(
		private router: Router,
		private service: EntEstCreService,
		private sysDicService: SystemDictionaryService
		){

	}
	ngOnInit(){
		this.router
		.routerState
		.root
		.queryParams
		.subscribe(data=>{
			this.entEst = new EntEst();

		});

		this.service.loadResourceQuotas(this.resourceQuotas
			,this.showError
			,this);


	}

	showError(msg:any) {
	    this.notice.open(msg.title, msg.desc);
	}

	selectLocal(){
		this.isLocal = true;
		this.entEst.BasicInfo.certMethod = "0";
		this.isADSelected();
	}

	selectAD(){
		this.isLocal = false;
		this.entEst.BasicInfo.certMethod = "1";
		this.isADSelected();
	}

	isADSelected(){
		  this.clearEntEst();
          if(this.isLocal == false){	  
			  return true;
		  }
		  return false;
	}
	//清空基本信息数据
	clearEntEst(){
		if(this.entEst!=null){
			  this.entEst.BasicInfo.name="";
			  this.entEst.BasicInfo.contactorName="";
			  this.entEst.BasicInfo.certUrl = "";
			  this.entEst.BasicInfo.password = "";
			  this.entEst.BasicInfo.description="";
		}
	}

	//数据验证
	validate(){
		let notValid = [
		{
			"name":"名称"
			,'value':this.entEst.BasicInfo.name
			,"op":"*"
		},
		{
			"name":"认证方式"
			,"value":this.entEst.BasicInfo.certMethod
			,"op":"*"
		}
		,{
			"name":"URL地址"
			,"value":this.entEst.BasicInfo.certUrl
			,"op":"*"
		},
		{
			"name":"用户名"
			,"value":this.entEst.BasicInfo.contactorName
			,"op":"*"
		},
		{
			"name":"密码"
			,"value":this.entEst.BasicInfo.password
			,"op":"*"
		},
		{
			"name":"描述"
			,"value":this.entEst.BasicInfo.description
			,"op":"*"
		},
		{
			"name":"可创建云主机数量"
			,"value":this.entEst.ResourceQuota.platformVMQuota
			,"op":"*"
		},
		{
			"name":"可创建物理机数量"
			,"value":this.entEst.ResourceQuota.physicalMachineQuota
			,"op":"*"
		},
		{
			"name":"可用存储额度"
			,"value":this.entEst.ResourceQuota.storageQuota
			,"op":"*"
		},
		{
			"name":"可创建快照数量"
			,"value":this.entEst.ResourceQuota.snapQuota
			,"op":"*"
		},
		{
			"name":"可创建镜像数量"
			,"value":this.entEst.ResourceQuota.imageQuota
			,"op":"*"
		}
		].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

		if(notValid !== void 0)
		{
			this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
			return false;
		}

		return true;
	}

	showMsg(msg: string)
	{
		this.notice.open("系统提示", msg);
	}

	//创建企业
	create(){
		if(this.validate())
		{
			this.service.createEnterpise(this.entEst).then(ret=>{
				this.returnToList();
			})
			.catch(err=>{
				console.log('创建企业失败', err);
				this.notice.open("创建企业", "创建企业失败");
			})
		}
	}

	cancel(){
		this.returnToList();
	}

	returnToList(){
    	this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

}