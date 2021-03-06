/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, ValidationService, NoticeComponent, CountBarComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';
//service
import { ProdDirDetailService } from '../service/prod-dir-detail.service';
import { CreateProdDirService } from '../service/prod-dir-new.service';
//model
import { ProdDir, platform } from '../model/prodDir.model';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirCreComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ProdDirDetailService: ProdDirDetailService,
        private CreateProdDirService: CreateProdDirService,
        private LayoutService: LayoutService,
        private v: Validation
    ) {
        this.v.result={};
     }

    @ViewChild('notice')
    notice: NoticeComponent;

    prodDir = new ProdDir();
    _platformlist: Array<platform> = new Array<platform>();
    pageTitle: string;
    //编辑
    serviceId: string;
    type: string;
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.type = params['type'];
            if (this.type == 'new' && params['vcpu']) {
                this.prodDir.specification.vcpu = params['vcpu'];
                this.prodDir.specification.mem = params['mem'];
                this.prodDir.specification.startupDisk = params['startupDisk'];
            } else {
                this.serviceId = params['id']
                console.log(this.serviceId);
            }
        })
        //创建
        if (this.type == 'new') {
            this.pageTitle = 'PROD_MNG.CREATE_PRODUCT_CAT'
            //获取可用平台
            this.LayoutService.show();
            this.CreateProdDirService.postCpuMmr(this.prodDir.specification.vcpu, this.prodDir.specification.mem, this.prodDir.specification.startupDisk)
                .then(response => {
                    if (response && 100 == response.resultCode) {
                        let resultContent = response.resultContent;
                        this._platformlist = response.resultContent;
                        console.log('pingtai', this._platformlist);
                        for (let plate of this._platformlist) {
                            if (!plate.zoneList) continue;
                            for (let zone of plate.zoneList) {
                                // for (let storage of zone.storageList) {
                                //     storage.selected = false;
                                // }
                                if (zone.storageList[0]) {
                                    zone.storageId = zone.storageList[0].storageId;
                                    zone.serviceSKUId = zone.storageList[0].serviceSKUId;
                                    zone.storageList[0].selected = true;
                                    zone.disable=false;
                                }else{
                                    // zone.storageList[0].storageName='未设置启动盘'
                                    zone.storageList.unshift({
                                        displayName:"",
                                        selected:false,
                                        serviceSKUId:'',
                                        storageId:"",
                                        storageName:"未设置启动盘"
                                    })
                                    zone.disable=true;
                                }
                                zone.selected = false;
                            }
                        }
                    }
                    this.LayoutService.hide();
                    this.selectAllZone = false;
                }).catch(err => {
                    console.error(err);
                    this.LayoutService.hide();
                });
        } else {
            this.pageTitle = 'PROD_MNG.EDIT_PRODUCT_CATALOG'
            this.getProdDirDetail(this.serviceId);
        }
    }
    //获取目录详情
    getProdDirDetail(id) {
        this.LayoutService.show();
        this.ProdDirDetailService.getVmProdDirDetail(id).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    console.log('vmdetail', response);
                    let resultContent = response.resultContent;
                    this.prodDir = response.resultContent;
                    this._platformlist = JSON.parse(JSON.stringify(this.prodDir.platformInfo)); 
                    for(let platform of this._platformlist){
                        for(let zone of platform.zoneList){
                            if(zone.selected==true){
                                zone.disable=true;
                                platform.selected=true;
                                // break;
                            }
                            if(!zone.storageId){
                                zone.storageName='未设置启动盘';
                                zone.disable=true;
                            }                            
                        }
                    }
                } else {

                }
                console.log('filterPlatform',this._platformlist)
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
        console.log(this.prodDir);
    }
    //同步countBar数据
    outputValue(e, arg) {
        this.prodDir.specification[arg] = e;
        console.log(this.prodDir.specification.mem);
    }

    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        console.log(this.selectAllZone);
        for (let plate of this._platformlist) {
            for (let zone of plate.zoneList) {
                if(!zone.disable)zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
    }
    //选择平台启动盘,this 
    // selectStorage(id, idx, idxxx) {
    //     console.log(id);
    //     console.log(idx);
    //     for (let storage of this._platformlist[idx].zoneList[idxxx].storageList) {
    //         if (storage.storageId == id) {
    //             storage.selected = true;
    //         } else {
    //             storage.selected = false;
    //         }
    //     }
    // }
    //选择平台可用区
    selectZone(idx, idxx) {
        console.log('121212121', idx, idxx);
        this._platformlist[idx].zoneList[idxx].selected = !this._platformlist[idx].zoneList[idxx].selected;
        console.log(this._platformlist[idx]);
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        if (this.prodDir.platformList.length != this._platformlist.length) {
            this.selectAllZone = false;
            return;
        }
        this.selectAllZone = true;
        for (let platform of this._platformlist) {
            for (let zone of platform.zoneList) {
                if (zone.selected == false) {
                    return this.selectAllZone = false;
                }
            }
        }
    }

    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            serviceName: [this.prodDir.serviceName, [this.v.isBase, this.v.isUnBlank,this.v.maxLength(50),this.v.minLength(2)], "产品目录名称格式不正确"],

            description: [this.prodDir.description, [this.v.maxLength(255)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        console.log(this.prodDir);
        let message = this.checkForm();
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        if (this.prodDir.specification.vcpu == 0 || this.prodDir.specification.mem == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PRODUCT_SPEC_ERROR'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PRODUCT_SPEC_ERROR=>产品规格数据设置错误 
            return;
        }
        //过滤平台数据
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    ele.selected=true;
                    return ele;
                }
            }
        })

        if (this.prodDir.platformList.length == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PLATFORM'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PLATFORM=>请选择可用平台 
            return;
        }
        if (this.type == 'new') {
            this.prodDir.serviceTemplateId = '';
            this.LayoutService.show();
            this.CreateProdDirService.postVmProdDir(this.prodDir).then(response => {
                this.LayoutService.hide();                
                if(response&&response.resultCode==12001001){
                    this.notice.open('COMMON.ERROR','产品目录名称已存在');
                    this.prodDir.platformList=[];
                }else if(response.resultCode==100){
                    console.log(response);
                    this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
                }else{
                    this.notice.open('COMMON.ERROR',response.resultCode);
                }               
            }).catch(err => {
                console.error(err);
                this.LayoutService.hide();
            })
        } else {
            // this.prodDir.platformList=JSON.parse(JSON.stringify(this.prodDir.platformInfo));
            this.prodDir.platformInfo=[];
            //去掉未选中平台；
            for(let i=0;i<this.prodDir.platformList.length;i++){
                if(!this.prodDir.platformList[i].selected){
                    this.prodDir.platformList.splice(i,1);
                }
            }
            console.log('splice',this.prodDir);
            this.LayoutService.show();
            this.CreateProdDirService.editVmProdDir(this.serviceId,this.prodDir).then(response => {
                console.log(response);
                this.LayoutService.hide();
                this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
            }).catch(err => {
                console.error(err);
                this.LayoutService.hide();
            })
        }

    }


}
