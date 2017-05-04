import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';
//model 
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem } from '../model/database-middleware-service.model'
// service;
import { DatabaseMiddlewareService } from '../service/database-middleware-service.service';

@Component({
    templateUrl: '../template/database-middleware-service-cre.component.html',
    providers: []
})
export class DatabaseMiddlewareServiceCreComponent implements OnInit {
    constructor(
        private v: Validation,
        private router: ActivatedRoute,
        private route: Router,
        private service: DatabaseMiddlewareService,
        private LayoutService: LayoutService,
        private location: Location
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    serviceType: string;
    servcieTitle:string;
    resourcePooList: Array<ResourcPool>;
    _platformlist: Array<PlatformSimpleItem>;
    databaseMiddlewareService: DatabaseMiddlewareServiceModel = new DatabaseMiddlewareServiceModel();
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.serviceType = params['type'];
            this.servcieTitle=
                this.serviceType=='MiddleWare'?'中间件服务器':'数据库服务器';
            this.databaseMiddlewareService.serverType = params['code'];
        });
        console.log(this.serviceType,this.databaseMiddlewareService.serverType);

        // if (this.databaseMiddlewareService.serviceObjectCode == '2') {
        //     this.getResourcePoolList();
        // } else if (this.databaseMiddlewareService.serviceObjectCode != '8') {
        //     this.getPlateForm();
        // }
    }
    //获取资源池列表
    getResourcePoolList() {
        this.LayoutService.show();        
        this.service.getResourcePoolList().then(res => {
            console.log('resourcepool', res);
            if (res.resultCode == '100') {
                this.resourcePooList = res.resultContent;
                this.resourcePooList.forEach(ele => ele.selected = false);
                // this.resourcePooList.sort((ele1, ele2) => {
                //     // return Number(ele1.regionId) - Number(ele2.regionId)
                // })
                this.LayoutService.hide();                
            }
        }).catch(err => {
            console.log(err);
                this.LayoutService.hide();            
        })
    }
    //获取平台列表;
    getPlateForm() {
        this.LayoutService.show();
        this.service.getDiskPlateForms().then(
            response => {
                console.log('PINGTAI', response);
                if (response && 100 == response.resultCode) {
                    // let resultContent = response.resultContent;
                    this._platformlist = response.resultContent;
                    for (let plate of this._platformlist) {
                        if (!plate) continue;
                        plate.selected = false;
                    }
                } else {

                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }

    //选择全部资源池或平台
    allSelected: boolean = false;
    selectAll(list) {
        console.log(list);
        this.allSelected = !this.allSelected;
        list.forEach(ele => ele.selected = this.allSelected);
    }
    //选择资源池或平台
    selectOne(idx,list) {
        console.log(list);
        list[idx].selected = !list[idx].selected;
        for (let ele of list) {
            if (ele.selected == false) {
                this.allSelected = false;
                return;
            }
        }
        this.allSelected = true;
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            serviceName: [this.databaseMiddlewareService.serviceName, [this.v.isBase, this.v.isUnBlank], "产品目录名称格式不正确"],

            description: [this.databaseMiddlewareService.desc, [this.v.maxLength(68)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    //创建数据库或中间件服务
    onCreateService() {
        console.log(this.databaseMiddlewareService);
        let message = this.checkForm();
        if (message) return;
        // if (this.databaseMiddlewareService.serviceObjectCode == '2') {
        //     this.databaseMiddlewareService.pmPoolList=[];
        //     this.databaseMiddlewareService.pmPoolList = this.resourcePooList.filter(ele => {
        //         if (ele.selected) { return ele; }
        //     })
        //     if(this.databaseMiddlewareService.pmPoolList.length==0){
        //         this.notice.open('COMMON.OPERATION_ERROR','请选择资源池信息')
        //         return 
        //     }
        // } else if (this.databaseMiddlewareService.serviceObjectCode != '8') {
        //     this.databaseMiddlewareService.platformList=[];
        //     this._platformlist.forEach(ele => {
        //         if (ele.selected) {
        //             this.databaseMiddlewareService.platformList.push({
        //                 "code": ele.platformName,
        //                 "id": ele.platformId,
        //                 "name": ele.platformName,
        //             })
        //         }
        //     })
        //      if(this.databaseMiddlewareService.platformList.length==0){
        //         this.notice.open('COMMON.OPERATION_ERROR','请选择平台信息')
        //         return 
        //     }
        // }
        console.log(this.databaseMiddlewareService);
        this.LayoutService.show(); 
        this.service.postDatabaseMiddlewareService(this.databaseMiddlewareService).then(res=>{
            console.log(res);
            this.LayoutService.hide();
            this.location.back();            
        }).catch(err=>{
            console.error(err);
            this.LayoutService.hide();            
        })       
    }
    cancel() {
        this.location.back();
    }
}