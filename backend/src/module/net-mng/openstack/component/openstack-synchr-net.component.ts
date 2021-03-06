import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


import { OpenstackService } from '../service/openstack.service';
import { Network_Syn } from '../model/network-syn.model';
import { Network } from '../model/network.model';
import { SelectedTenantListService } from '../service/selected-tenant-list.service';

@Component({
	selector: "openstack-synchr-net",
	templateUrl: "../template/OpenStack-synchr-net.html",
	styleUrls: [],
	providers: []	
}
	)
export class OpenstackSynchrNetComponent implements OnInit{
	constructor(
		private router: ActivatedRoute,
        private router2: Router,
		private service: OpenstackService ,
		private layoutService: LayoutService,
		//private dicService: SystemDictionaryService,
        private tenantService: SelectedTenantListService
	){

	}
	
	@ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

	platform_id:string;
    platformName:string;
	synNetworks:Array<Network_Syn>;

	typeDic: Array<SystemDictionary>;//网络类型
    sharedDic: Array<SystemDictionary>;//是否共享
    stateDic: Array<SystemDictionary>;//运行状态
    //statusDic: Array<SystemDictionary>;//状态
    synDic: Array<SystemDictionary>;//同步结果 1-新增，2-已存在，3-不存在
	ngOnInit(){
        this.router.params.forEach((params: Params) => {
			this.platform_id = params['platform_id'];
            this.platformName = params['platformName'];
			console.log("接收的platform_id:" + this.platform_id);
            console.log("接收的platformName:" + this.platformName);
			
		});
		// this.dicService.getItems("NETWORK", "TYPE")
        //     .then(
        //     (dic) => {
        //         this.typeDic = dic;
        //         return this.dicService.getItems("NETWORK", "SHARED");
        //     })
        //     .then((dic) => {
        //         this.sharedDic = dic;
        //         return this.dicService.getItems("NETWORK", "STATE");
        //     })
        //     .then((dic) => {
        //         this.stateDic = dic;
        //         return this.dicService.getItems("NETWORK","SYNC");
        //     })
        //     .then((dic) => {
        //         this.synDic = dic;
        //         this.getSynList(this.platform_id);
                
        //     });
		this.getSynList(this.platform_id);
        
		
	}

    getEids(){
            let tNameList = this.tenantService.getList();
            let eids:string="";
            if(!tNameList || tNameList.length==0){
                console.log("tNameList为空");
            }else{
                tNameList.forEach((t)=>{
                    eids = t.id +"," + eids;
                });
                
                return eids.substring(0,eids.length-1);
            }
        
    }
	getSynList(platform_id:string):void {
		this.layoutService.show();
        let eids = this.getEids();
        this.service.getSynNetworks(platform_id,eids)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
					this.synNetworks = response.resultContent;
                    //this.filter();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
	}
	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_OPENSTACK.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_OPENSTACK.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

	// //根据value获取字典的txt
    // getDicText(value: string, dic: Array<SystemDictionary>): String {
    //     if (!$.isArray(dic)) {
    //         return value;
    //     }
    //     const d = dic.find((e) => {
    //         return e.value == value;
    //     });
    //     if (d) {
    //         return d.displayValue;
    //     } else {
    //         return value;
    //     }

    // }
    //添加一个
    addOne(selected: Network_Syn){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        network_syns.push(selected);
           
        this.service.synNetworkAdd( network_syns ).then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_OPENSTACK.ADD_SUCCESS");
                    this.getSynList(this.platform_id);
                    //this.filter();
                }else{
                     this.showAlert("COMMON.OPERATION_ERROR");
                }
        })
        .catch((e)=>this.onRejected(e));
    }



    //全部添加
    addAll(){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        this.synNetworks.forEach((s)=>{ 
            if(s.syncResult=='1'){
                network_syns.push(s);
            }
        })

        if(!network_syns || network_syns.length==0){
            //没有需要添加的
            this.layoutService.hide();
            this.showAlert("NET_MNG_OPENSTACK.NONEED_ADD");
        }else {

            this.service.synNetworkAdd( network_syns ).then(
                response=>{
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_OPENSTACK.ADDALL_SUCCESS");
                        this.getSynList(this.platform_id);
                        //this.filter();
                    }else{
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
            })
            .catch((e)=>this.onRejected(e));
        }
    }
    //单个更新
    updateOne(selected: Network_Syn){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        network_syns.push(selected);
        
        this.service.synNetworkUpdate( network_syns ).then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_OPENSTACK.UPDATE_SUCCESS");
                    this.getSynList(this.platform_id);
                    //this.filter();
                }else{
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
        })
        .catch((e)=>this.onRejected(e));
    }
    //更新所有
    updateAll(){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        this.synNetworks.forEach((s)=>{ 
            if(s.syncResult=='2'||s.syncResult=='1'){
                network_syns.push(s);
            }
        })
        if(!network_syns || network_syns.length==0){
            //没有需要更新的
            this.layoutService.hide();
            this.showAlert("NET_MNG_OPENSTACK.NONEED_UPDATE");
        }else {
            this.service.synNetworkUpdate( network_syns ).then(
                response=>{
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_OPENSTACK.UPDATEALL_SUCCESS");
                        this.getSynList(this.platform_id);
                        //this.filter();
                    }else{
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
            })
            .catch((e)=>this.onRejected(e));
        }
    }
    //单个禁用
    disableOne(selected: Network_Syn){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        network_syns.push(selected);
        
        this.service.synNetworkDisable( network_syns ).then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_OPENSTACK.DISABLE_SUCCESS");
                    this.getSynList(this.platform_id);
                    //this.filter();
                }else{
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
        })
        .catch((e)=>this.onRejected(e));
    }
    //全部禁用
    disableAll(){
        this.layoutService.show();
        let network_syns = new Array<Network_Syn>();
        this.synNetworks.forEach((s)=>{ 
            //if(s.syncResult=='3'){
                network_syns.push(s);
            ///}
        })
        this.service.synNetworkDisable( network_syns ).then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_OPENSTACK.DISABLEALL_SUCCESS");
                    this.getSynList(this.platform_id);
                    //this.filter();
                }else{
                     this.showAlert("COMMON.OPERATION_ERROR");
                }
        })
        .catch((e)=>this.onRejected(e));
    }

    //返回上一级
    cancel(){
        this.router2.navigateByUrl("net-mng/openstack/openstack-net-mng");
    }
}