import { Component,OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

import { Image } from'../model/image.model';
import { OpenstackMngService} from '../service/openstack-mng.service';

@Component({
    selector:"img-openstack-image-sync-public",
    templateUrl:"../template/image-public-sync-openStack.html",
    styleUrls:[],
    providers:[]

})
export class OpenstackImageSyncPublicComponent implements OnInit{
    constructor(
        private router: ActivatedRoute,
        private router2: Router,
        //private dicService: SystemDictionaryService,
        private service: OpenstackMngService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ){}

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    platformId:string;
    platformName:string;
    images:Array<Image>;
    images_needsync:Array<Image>;

    typeDic: Array<SystemDictionary>;//镜像类型
    bits_typeDic: Array<SystemDictionary>;//系统位数
    ownerDic: Array<SystemDictionary>;//归属
    statusDic: Array<SystemDictionary>;//状态
    syncDic: Array<SystemDictionary>;//同步结果
    osDic: Array<SystemDictionary>;//操作系统
    ngOnInit(){
        // this.dicService.getItems("IMAGES", "TYPE")
        //     .then(
        //     (dic) => {
        //         this.typeDic = dic;
        //         return this.dicService.getItems("IMAGES", "BITS_TYPE");
        //     })
        //     .then((dic) => {
        //         this.bits_typeDic = dic;
        //         return this.dicService.getItems("IMAGES", "OWNER");
        //     })
        //     .then((dic) => {
        //         this.ownerDic = dic;
        //         return this.dicService.getItems("IMAGES", "ADM_STATUS");
        //     })
        //     .then((dic) => {
        //         this.statusDic = dic;
        //         return this.dicService.getItems("IMAGES", "SYNC_RESULT");
        //     })
        //     .then((dic)=>{
        //         this.syncDic = dic;
        //         return this.dicService.getItems("IMAGES","OS");
        //     })
        //     .then((dic)=>{
        //         this.osDic = dic;
        //     });

        this.router.params.forEach((params: Params) => {
			this.platformId = params['platformId'];
            this.platformName = params['platformName'];
			console.log("platformId:" + this.platformId);
            console.log("接收的platformName:" + this.platformName);
			this.getSynImages();
		});
    }
    getSynImages():void{
        this.layoutService.show();
        this.service.getSynImages_public( this.platformId)
            .then(
                response =>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.layoutService.hide();
                        this.images = response.resultContent;
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //同步操作
    doSync(){
        //先清空

        //this.images_needsync.splice(0,this.images_needsync.length);
        this.images_needsync = new Array<Image>();
        this.images.forEach( (i)=>{
            if(i.selected){
                if(!i.displayName || i.displayName == ""){
                    i.displayName = i.name;
                }
                if(!i.bitsType || i.bitsType==""){
                    i.bitsType=null;
                }
                if(!i.os || i.os==""){
                    i.os=null;
                }
                this.images_needsync.push(i);
            }
        });

        if(this.images_needsync.length == 0){
            this.showAlert("HOST_OPENSTACK_MNG.PLEASE_CHOOSE_IMAGE_NEEDSYNC");
        }else{
            this.layoutService.show();
            this.service.doSynImages_public(this.platformId, this.images_needsync)
            .then(
                response =>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        //this.layoutService.hide();
                        this.getSynImages();
                        this.showAlert("HOST_OPENSTACK_MNG.IMAGE_SYNC_SUCCESS");
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }
        
    }
    //根据value获取字典的txt
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

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("HOST_OPENSTACK_MNG.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
    back(){
        this.router2.navigate(['host-mng/img-mng/openstack-mng', {"platformId": this.platformId,"platformName":this.platformName}]);
    }
  
}