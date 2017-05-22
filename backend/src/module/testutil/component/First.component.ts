import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from "../../../architecture";

import { FirstService } from'../service/first.service';
import { FirstModel } from'../model/first.model';

@Component({
    selector: "first",
    templateUrl: "../template/first.html",
    styleUrls: [],
    providers: []
})
export class FirstComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private service: FirstService,
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    entry: FirstModel = new FirstModel();
      
    ngOnInit() {     

    }

    insertone(){
        console.log(this.entry.bodyVar);
        this.service.insertone(this.entry);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}
