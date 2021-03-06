﻿import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DialogTranslate } from '../service/dialog-translate.service';

@Component({
    selector: 'fc-notice',
    templateUrl: '../template/notice.component.html',
    inputs: ["title", "msg", "ot"],
    providers: [DialogTranslate]
})

export class NoticeComponent implements OnInit {
    @Output() of = new EventEmitter<any>();

    param: any;
    title: String;
    msg: String;
    showMsg: String;

    constructor(private dialogTranslate: DialogTranslate) {
        
    }
    
    @ViewChild('dialog')
    dialog: ModalComponent;

    ngOnInit() {
    }

    ngOnChanges() {
        this.param = this.dialogTranslate.getParam(this.msg);
        this.showMsg = this.dialogTranslate.getText(this.msg);
    }

    nof() {
        this.of.emit();
    }

    open(title?: String, msg?: String) {
        title && (this.title = title);
        msg && (this.msg = msg);
        this.param = this.dialogTranslate.getParam(this.msg);
        this.showMsg = this.dialogTranslate.getText(this.msg);
        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }
}