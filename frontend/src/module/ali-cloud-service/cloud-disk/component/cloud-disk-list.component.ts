import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel, diskOrderModel, diskListModel } from "../model/cloud-disk.model";

//Service
import { AliCloudDiskService } from "../service/cloud-disk.service";
import { AliCloudDiskDictService } from "../service/cloud-disk-dict.service";


@Component({
    selector: "alics_disklist",
    templateUrl: "../template/cloud-disk-list.html",
    styleUrls: ["../style/cloud-disk.less"],
    providers: []
})
export class AliCloudDiskListComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudDiskService,
        private dictService: AliCloudDiskDictService,
        private activatedRouter: ActivatedRoute,
    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    //keysecret: keysecretModel = new keysecretModel();

    regions: Array<RegionModel> = [];

    disks: Array<diskListModel> = []; //订购body模型

    diskCategoryDictArray: Array<SystemDictionary> = [];
    diskStatusDictArray: Array<SystemDictionary> = [];
    diskChargeTypeDictArray: Array<SystemDictionary> = [];
    diskTypeDictArray: Array<SystemDictionary> = [];
    diskBoolDictArray: Array<SystemDictionary> = [];

    private okCallback: Function = null;

    okClicked() {
        console.log('okClicked');
        if (this.okCallback) {
            console.log('okCallback()');
            this.okCallback();
            this.okCallback = null;
        }
    }

    private confirmedHandler: Function = null;

    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }

    ngOnInit(): void {
        this.getKeySecret();

        this.dictService.diskCategoryDict
        .then((items) => {
            this.diskCategoryDictArray = items;
            console.log(this.diskCategoryDictArray, "this.diskCategoryDictArray");
        });
        this.dictService.diskStatusDict
        .then((items) => {
            this.diskStatusDictArray = items;
            console.log(this.diskStatusDictArray, "this.diskStatusDictArray");
        });
        this.dictService.diskChargeTypeDict
        .then((items) => {
            this.diskChargeTypeDictArray = items;
            console.log(this.diskChargeTypeDictArray, "this.diskChargeTypeDictArray");
        });
        this.dictService.diskTypeDict
        .then((items) => {
            this.diskTypeDictArray = items;
            console.log(this.diskTypeDictArray, "this.diskTypeDictArray");
        });
        this.dictService.diskBoolDict
        .then((items) => {
            this.diskBoolDictArray = items;
            console.log(this.diskBoolDictArray, "this.diskBoolDictArray");
        });

    } 
    getKeySecret(): void {
        this.layoutService.show();
        this.service.getKeySecret()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.service.keysecret = response.resultContent;
                    console.log(this.service.keysecret, "this.keysecret!");
                    this.getAllRegions();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getAllRegions(): void {

        this.layoutService.show();
        this.service.getAllRegions()
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.regions = result.Regions.Region;
                    console.log(this.regions, "this.regions!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    selectRegion(region: RegionModel) {
        this.regions.map((item) => {
            item.selected = false;
        });
        region.selected = true;
        this.getDiskList(region); // 列出对应region的disk list
        if (region.areas == null || region.areas.length == 0) {
            this.getArea(region);
        }
    }

    getDiskList(region: RegionModel) {
        this.layoutService.show();
        this.service.getDiskList(this.pageIndex, this.pageSize, region.RegionId)
        .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.disks = result.Disks.Disk;
                    this.totalPage = Math.ceil(result.TotalCount/this.pageSize);
                    console.log(result.TotalCount, this.totalPage, "result.TotalCount, this.totalPage!");
                    for(let i=0; i<this.disks.length; i++) {
                        console.log(this.disks[i].DiskId, " == ");
                    }
                    console.log(this.disks, "this.disks!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
        })
        .catch((e) => {
                this.onRejected(e);
            });

    }

    //根据regionId获取可用区列表
    getArea(region:RegionModel) {
        this.layoutService.show();
        this.service.getArea(region.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    region.areas = result.Zones.Zone;
                    console.log(region.areas, "areas of selected Region!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    goToDiskOrder() {
        this.router.navigate([`ali-cloud-service/cloud-disk/cloud-disk-order`]);
    }

    displayDiskType(disktype: string):string {
        let diskDict:Array<SystemDictionary> = this.diskCategoryDictArray.filter((item) => {
            return item.value == disktype;
        });
        if (diskDict.length != 0) {
            return diskDict[0].displayValue;
        } else {
            return disktype;
        }
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }


    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    /*
        //选择行
        selectItem(index:number): void {
            this.msgAlert.list[index].checked = !this.msgAlert.list[index].checked;
            console.log(this.msgAlert.list, "=== Please see which ones are selected ===");
            let selectedml = this.msgAlert.list.filter(n=> { return (n.checked == true);});
            if(selectedml.length == this.pageSize) {
                console.log("The latest one was selected, so all selected!");
                this.allSelected = true;
            } else {
                this.allSelected = false;
            }
        }
    
        selectOrUnSAllItems(): void {
            if (this.allSelected) {
                console.log("All checked before, so set them all unselected");
                this.allSelected = false;
                this.msgAlert.list.map(n=> { n.checked = false;});
            } else {
                console.log("All unchecked before, so set them all selected");
                this.allSelected = true;
                this.msgAlert.list.map(n=> { n.checked = true;});
            }
        }
    
        getSelectedItems() {
            this.selectedmsglist = this.msgAlert.list.filter(n=> { return (n.checked == true);});
            if (this.selectedmsglist.length != 0){
                return this.selectedmsglist;
            } else {
                return [];
            }
        }
        */

}