import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params} from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { BootDiskService } from '../service/platform-mng-bootDisk.service';

//model
import { BootDiskModel } from '../model/bootDisk.model';

@Component({
    templateUrl: '../template/pf-mng-bootDisk.component.html',
    styles: [],
    providers: []
})
export class bootDiskMngComponent implements OnInit {
    constructor(private layoutService:LayoutService,
                private service:BootDiskService,
                private route:Router,
                private router:ActivatedRoute,
                private location :Location
                ) {
    }

    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    // 确认Box/通知Box的标题
    title:String = "";
    // 确认Box/通知Box的内容
    msg:String = "";
    // 云平台类型
    // 云平台状态


    platformId:string;
    platformName:string;
    platformType:string;
    platformTypeName:string;
    zoneBootDiskList:Array<BootDiskModel>;
    //初始化
    ngOnInit() {
        this.router.params.forEach((params: Params)=>{
             this.platformId=params['id'];
             this.platformName=params['name'];
             this.platformType=params['type'];
             this.platformTypeName=
                params['type']=='0'?'OpenStack':'Vmware';
        })       
         
        this.getBootDiskList();
    }
    //获取启动盘列表
   getBootDiskList(){
       this.service.getbootDiskList(this.platformId).then(res=>{
           console.log(res);
           this.zoneBootDiskList=res.resultContent;
       }).catch(err=>{
           console.error.bind(err);
       })
   }
   //选择可用区
   selectedZone:BootDiskModel;
   //编辑启动盘
   editZoneBootDisk(){
        if(this.selectedZone){
            console.log(this.selectedZone);
            if(this.selectedZone.bootStorageId){
                this.service.editBootDiskData=this.selectedZone;
                this.route.navigate(['pf-mng2/pf-mng-bootDisk-creEdit', {id:this.platformId,type:this.platformType,'isEdit':'edit'}])
            }else{
                this.notice.open('操作错误','可用区下没有可编辑启动盘信息');
            }
        }else{
            this.notice.open('操作错误','请选择可用区');
            return false;
        }
        
   }
   //启用启动盘
   enableZoneBootDisk(){
       if(this.selectedZone){
            console.log(this.selectedZone);
            if(this.selectedZone.bootStorageStatus=='1'){
                this.notice.open('操作错误','启动盘状态已启用');
                return;
            }
            this.service.enableBootDisk(this.selectedZone.bootStorageId).then(res=>{
                console.log(res);
                this.getBootDiskList();
            }).catch(err=>{
                console.log(err);
            })
        }else{
            this.notice.open('操作错误','请选择可用区');
            return false;
        }
   }
   //禁用启动盘
   suspendZoneBootDisk(){
      if(this.selectedZone){
            console.log(this.selectedZone);
            if(this.selectedZone.bootStorageStatus=='2'){
                this.notice.open('操作错误','启动盘状态已禁用');
                return;
            }
            this.service.suspendBootDisk(this.selectedZone.bootStorageId).then(res=>{
                if(res.resultCode=="10006003"){
                    this.notice.open('操作错误','不能禁用已关联产品目录的启动盘');
                }else{
                    this.getBootDiskList();
                }
                console.log(res);
                
            }).catch(err=>{
                console.log(err);
            })
        }else{
            this.notice.open('操作错误','请选择可用区');
            return false;
        }       
   }
   //删除启动盘
   deleteZoneBootDisk(){
       if(this.selectedZone){
            console.log(this.selectedZone);
            if(this.selectedZone.bootStorageStatus=='1'){
                this.notice.open('操作错误','不能删除启用状态下启动盘');
                return;
            }
            this.service.deleteBootDisk(this.selectedZone.bootStorageId).then(res=>{
                console.log(res);
                if(res.resultCode=="10006003"){
                    this.notice.open('操作错误','不能禁用已关联产品目录的启动盘');
                }else{
                    this.getBootDiskList();
                }
            }).catch(err=>{
                console.log(err);
            })
        }else{
            this.notice.open('操作错误','请选择可用区');
            return false;
        }              
   }
    back(){
        this.location.back();
    }
    goList(){
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    createBootDisk(){
        let isCanSet:boolean=false;
        for(let zone of this.zoneBootDiskList){
            if(!zone.bootStorageId){
                isCanSet=true;
                isCanSet&&this.route.navigate(['pf-mng2/pf-mng-bootDisk-creEdit', {id:this.platformId,type:this.platformType}])                
                return;
            }
        }
        if(!isCanSet){
                this.notice.open('提示','目前所有可用区都已经设置启动盘')            
        }
    }
    ccf(){}
    nof(){}
}
