﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { Admin } from '../model/admin.model';

import { Enterprise } from '../model/enterprise.model';

import { EntAdminMngService } from '../service/ent-admin-mng.service';

import { EntAdminCreService } from '../service/ent-admin-cre.service';



@Component({
    selector: 'ent-admin-cre',
    templateUrl: '../template/ent-admin-mng.html',
    styleUrls: [],
    providers: []
})
export class EntAdminMngComponent implements OnInit {
    pageIndex:number=0;
    tp: number = 1;
    pageSize: number = 20;
    noticeTitle: string = "";
    noticeMsg: string = "";

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    constructor(
        private service: EntAdminMngService,
        private creService: EntAdminCreService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) { }

    admins: Admin[];
    enterprises: Enterprise[];
    selectEnterprise: Enterprise;
    ngOnInit() {

        this.layoutService.setLoading(true);
        this.creService.getEnterprise().then(
            response => {

                if (response && 100 == response["resultCode"]) {

                    this.enterprises = response["resultContent"];

                } else {
                    this.showAlert("Res sync error");
                }
            }
        ).catch(this.onRejected);

        this.getData();
    }

   
    deleteAdmins() {
        let selectAdmin: Admin[] = this.admins.filter((admin) => { return admin.isSelect; });
        if (selectAdmin.length == 0) {
            this.showAlert("请先选择需要删除的管理员！");
            return;
        }

        this.noticeTitle = "警告";
        let names: string[] = [];
        let ids: string[] = [];
        selectAdmin.forEach(admin => {
            names.push(admin.contactorName);
            ids.push(admin.id);
        });
        this.noticeMsg = "确认删除'" + names.join("','") + "' ?";
        this.confirm.ccf = () => {

        }
        this.confirm.cof = () => {
            this.service.deleteAdmin(selectAdmin).then(response => {
                this.layoutService.setLoading(false);
                if (response && 100 == response["resultCode"]) {
                    //删除成功
                    this.getData();
                } else {
                    alert("Res sync error");
                }
            }
            ).catch(this.onRejected);
        }
        this.confirm.open();
    }


    change2Status(status: number): void {
        let selectAdmin: Admin[] = this.admins.filter((admin) => { return admin.isSelect && admin.status != status; });
        if (selectAdmin.length == 0) {
            this.showAlert('请先选择需要' + (status == 0 ? "取消激活" : "激活") + '的管理员！');
            return;
        }

        this.noticeTitle = "警告";
        let names = [];
        let ids: string[] = [];
        selectAdmin.forEach(admin => {
            names.push(admin.contactorName);
            ids.push(admin.id);
        });
        this.noticeMsg = "确认" + (status == 0 ? "取消激活" : "激活") + "'" + names.join("','") + "' ?";
        this.confirm.ccf = () => {
        }
        this.confirm.cof = () => {
            this.service.updateAdminStatus(selectAdmin, status).then(response => {
                this.layoutService.setLoading(false);
                if (response && 100 == response["resultCode"]) {
                    this.getData();
                } else {
                    alert("Res sync error");
                }
            }
            ).catch(this.onRejected);
        }
        this.confirm.open();
    }

    changEnterpriseFilter(enterprise: Enterprise) {
        this.selectEnterprise = enterprise;
        this.pageIndex = 0;
        this.getData();
    }

    getData(pageIndex?:number): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.setLoading(true);
        if (this.selectEnterprise) {
            this.service.getEnterpriseAdmins(this.selectEnterprise.id, this.pageIndex , this.pageSize).then(
                response => {
                    this.layoutService.setLoading(false);
                    if (response && 100 == response["resultCode"]) {
                        this.setData(response);
                    } else {
                        alert("Res sync error");
                    }
                }
            ).catch(this.onRejected);
        } else {
            this.service.getAdmins(this.pageIndex, this.pageSize).then(
                response => {
                    this.layoutService.setLoading(false);
                    if (response && 100 == response["resultCode"]) {
                        this.setData(response);
                    } else {
                        alert("Res sync error");
                    }
                }
            ).catch(this.onRejected);
        }
    }


    setData(ret) {
        this.admins = ret.resultContent;
        this.tp = ret.pageInfo.totalPage;
    }


    gotoCreatePage(): void {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-cre");
    }

    eidtAdmin(admin: Admin) {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-cre/" + admin.id);
    }
    selectAll($event: any): void {
        console.log($event);
        let checked = $event.target.checked;
        this.admins.forEach(admin => {
            admin.isSelect = checked;
        });
    }

    showAlert(msg: string): void {
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        alert(reason);
    }

    nof() {

    }

    cof() { }

    ccf() { }
}
