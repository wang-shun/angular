import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';
import { CaseClosed } from '../model/case-closed.model';
import { CaseHandle } from '../model/case-handle.model';

//service
import { CaseMngService } from '../service/case-mng-list.service';

@Component({
    selector: 'case-depart-list',
    templateUrl: '../template/case-depart-list.html',
    styleUrls: ['../style/case-mng-list.less'],
    providers: []
})

export class CaseDepartListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : CaseMngService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("creCase")
    creCase: PopupComponent;
    @ViewChild("caseDetail")
    caseDetail: PopupComponent;
    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 8;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;
    typeDic: Array<SystemDictionary>;
    emergencyDic: Array<SystemDictionary>;

    isEdit: boolean;
    data: Array<CaseMngList>;
    basicInfo: CaseMngList= new CaseMngList();
    handledInfo: Array<CaseHandle>;
    closedInfo: CaseClosed= new CaseClosed();
    search: "";
    subject: string;
    type: string;
    status: string;
    emergency: string;
    defaultType= "";
    defaultStatus= "";
    defaultEmergency= "";
    selectedEmergency= this.defaultEmergency;
    selectedType= this.defaultType;
    selectedStatus= this.defaultStatus;
    id: string;

    criteria: CaseMngList= new CaseMngList();

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getData();
        console.log("typeDic",this.service.typeDic);
    }

    getData(pageIndex?) {
        this.subject = this.search || "";
        this.type= this.selectedType || "";
        this.status= this.selectedStatus|| "";
        this.emergency= this.selectedEmergency|| "";
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize, this.subject, this.type, this.status, this.emergency)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data= response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
                        console.log("data",response["resultContent"]);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
}


    myCase(){
        this.router.navigate([`user-center/case-mng/case-mng-list`]);
    }
    
    getBasicInfo(item){
        this.id= item.id;
        this.layoutService.show();
        this.service.getBasicInfo(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.basicInfo= response["resultContent"];
                        console.log("basicInfo",this.basicInfo);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
}

    getHandelInfo(item){
        this.id= item.id;
        this.layoutService.show();
        this.service.getHandelInfo(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.handledInfo= response["resultContent"];
                        console.log("handleInfo",response["resultContent"]);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getClosedInfo(item){
        this.id= item.id;
        this.layoutService.show();
        this.service.getClosedInfo(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.closedInfo= response["resultContent"];
                        console.log("closedInfo",this.closedInfo);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getDetail(item){
        this.basicInfo.subject= '';
        this.basicInfo.statusName= '';
        this.basicInfo.typeName= '';
        this.basicInfo.contact= '';
        this.basicInfo.contactNo= '';
        this.basicInfo.creatorName= '';
        this.basicInfo.updateDate= '';
        this.basicInfo.creatorOrganization= '';
        this.basicInfo.creatorTenant= '';
        this.basicInfo.details= '';
        this.handledInfo= null;
        this.getBasicInfo(item);
        this.getClosedInfo(item);
        this.getHandelInfo(item);
        this.id= item.id;
        this.subject= item.subject;
        this.caseDetail.open("USER_CENTER.CASE_DETAIL^^^"+this.id+"^^^"+this.subject );
    }

    departCase(){
        this.router.navigate([`user-center/case-mng/case-depart-list`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.FAILED_TO_GET_DATA");
    }

}
