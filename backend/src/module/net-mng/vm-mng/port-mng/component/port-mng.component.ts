﻿import { Component, ViewChild, OnInit  } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../../architecture';

//model
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
import { DCModel } from "../model/dc.model";
import { ClusterMode } from "../model/cluster.model";

//service
import { PortMngService } from '../service/port-mng.service';
import { selectedPlatform } from "../../../vm-mng-index/service/platform.service";


@Component({
    selector: 'port-mng-list',
    templateUrl: '../template/port-mng.html',
    styleUrls: [],
    providers: []
})

export class PortMngComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: PortMngService,
        private layoutService: LayoutService
    ) {


    }
    noticeTitle = "";
    noticeMsg = "";

    selectedPlatform = selectedPlatform;

    @ViewChild("notice")
    notice: NoticeComponent;

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    defaultCluster: ClusterMode = new ClusterMode();
    selectCluster = this.defaultCluster;//当前选中的可用区

    dcList: Array<DCModel>;

    allPorts: Array<PortMngModel>;
    filterPorts: Array<PortMngModel>;
    pid: string;//platformId;
    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.pid = params["pid"];
        });
        this.getDcList();
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData(this.pid)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.allPorts = response["resultContent"].portResList;
                    this.filter();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getDcList() {
        this.layoutService.show();
        this.service.getDCList(this.pid)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.dcList = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filterPorts = this.allPorts.filter((p) => {
            return (this.selectedDC == this.defaultDc || this.selectedDC.dcId === p.dcId) &&
                (this.selectCluster === this.defaultCluster || this.selectCluster.clusterId === p.clusterId);
        });
    }


    selectPort(port: PortMngModel) {
        this.filterPorts.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }


    gotoSetPage() {
        const port = this.filterPorts.find((p) => { return p.selected; });
        if (!port) {
            this.showAlert("NET_MNG_VM_PORT.PLEASE_CHOOSE_PORT_NEEDSET");
            return;
        }
        this.router.navigate([`net-mng/vm-mng/port-mng-set/${port.id}`, { platform_id: this.pid }]);
    }

    gotoVm() {
        this.router.navigate([`net-mng/vm-mng/${this.pid}`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_PORT.GETTING_DATA_FAILED");
    }
}
