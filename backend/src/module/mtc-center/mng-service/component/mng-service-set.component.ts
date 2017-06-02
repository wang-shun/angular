import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";

//model

//service
import { MngSetService } from '../service/mng-set.service';

@Component({
    selector:"mng-service-set",
    templateUrl:"../template/service-set.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceSetComponent implements OnInit{
    constructor(
        private router : Router,
        private service : MngSetService,
        private layoutService : LayoutService,
        private validationService: ValidationService
    ){

    }

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    completeDic: Array<SystemDictionary>;

    complete: string;
    minutes: string;

    ngOnInit() {
        this.service.completeDic.then(res =>{
            this.complete= res[0].value
        });
        console.log(this.service.completeDic);
    }

    setMngService(){
        if(!this.validationService.isNumber(this.minutes)){
            this.showAlert("时间只能输入数字");
            return;
        }
        this.layoutService.show();
        this.service.setMngService(this.complete,this.minutes)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.service.completeDic.then(res =>{
                            this.complete= res[0].value
                        });
                        this.minutes= "";
                        this.showAlert("设置成功");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
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
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }
}
