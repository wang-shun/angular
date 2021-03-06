import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import {  IpmiInfo} from "../model/physical-ipmi.model";
import { PhysicalModel } from "../model/physical.model";

@Component({
    selector: "physical-ipmi",
    templateUrl: "../template/physical-ipmi.html",
    styleUrls: [],
    providers: []
})
export class PhysicalIpmiComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: PhysicalEditService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
   
    @ViewChild("notice")
    notice: NoticeComponent;

   //ipmi: IpmiInfo;
   pmId:string;
   poolId:string;
   physical:PhysicalModel=new PhysicalModel();
   //testResult:boolean;


    ngOnInit() {
        // console.log(this.router.params);
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.pmId=id; 
            console.log("获取的物理机id",this.pmId) 
            this.getPhysicalById(id); 
                 
        });       
    }

   //获取物理机信息
     getPhysicalById(id:string):void{
       this.layoutService.show();
       this.service.getPhysical(id)
       .then(
           response=>{
               this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.physical = response["resultContent"];
                    this.poolId=this.physical.pmPoolId;
                   console.log("获取物理机的ILO信息","IP",this.physical.iloIPAddress,"username", this.physical.iloUserName,"password",  this.physical.iloPwd);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
       })
   }

   //验证IP
    // isIP(val: any): boolean {
    //     const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
    //     return reg.test(val);
    // }

   //保存IPMI信息
   saveIpmi(){
       if (!this.physical.iloIPAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_IP");
            return false;
        }
        if(!this.physical.iloIPAddress){
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_LEGAL_ILO_IP");
            return false;
        }
        if (!this.physical.iloUserName) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_USERNAME");
            return false;
        }
        if (!this.physical.iloPwd) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_PASSWORD");
            return false;
        }      
       this.layoutService.show();
       this.service.updateIpmiInfo(this.physical,this.pmId)
       .then(
           response=>{
               this.layoutService.hide();
               if(response && 100 == response["resultCode"]){
                    this.layoutService.hide();
                    // this.showAlert("保存成功！");
                    this.gotoList();
               }
           }
       )
   }

   //测试
   testIpmi(){
        if (!this.physical.iloIPAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_IP");
            return false;
        }
        if(!this.physical.iloIPAddress){
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_LEGAL_ILO_IP");
            return false;
        }
        if (!this.physical.iloUserName) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_USERNAME");
            return false;
        }
        if (!this.physical.iloPwd) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_PASSWORD");
            return false;
        }
        this.layoutService.show();
        this.service.testIpmiInfo(this.physical)
        .then(
            response=>{
                this.layoutService.hide();
               if(response && 100 == response["resultCode"]){
                    this.layoutService.hide();
                    if(response["resultContent"]){
                        this.showAlert("PHYSICAL_MNG.SUCCEED_TEST_ILO_INFO");
                    }
                    else{
                        this.showAlert("PHYSICAL_MNG.PLEASE_REINPUT_ILO_INFO");
                    }                 
               }                                        
            }
        )
   }

   //返回物理机列表
    gotoList() {
        this.route.navigate(["phy-mng/physical-mng/physical-list",{pmpoolId: this.poolId}]);
    }
    
    //取消
    cancel() {
         this.gotoList();
    }
    

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}
