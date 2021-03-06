import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent , SystemDictionary,
    dictPipe,PaginationComponent} from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

import { ClMngIdService } from '../service/cl-mng-id.service';
//model
import { Platform } from '../model/platform.model';

@Component({
    selector: 'cl-mng-list',
    templateUrl: '../template/cl-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class ClMngListComponent implements OnInit {


    constructor(private layoutService: LayoutService,
        private service: ClMngListService,
        private idService: ClMngIdService,
        private router: Router,
        private platFormTypeService: ClMngCreStep1Service,
        private commonService: ClMngCommonService,
        private dictPipe: dictPipe,
    ) {
    }

    // 平台数组
    platforms: Array<Platform> = new Array<Platform>();

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;
    //当前页数
    currPage:number=0;


    @ViewChild('removeConfirm')
    removeConfirm: ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: ConfirmComponent;

    @ViewChild('pagination')
    pagination:PaginationComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";
    // 云平台类型
    platFormType: Array<any> = new Array<any>();
    // 云平台状态
    platFormStatus: Array<any> = new Array<any>();


    //初始化
    ngOnInit() {
        console.log('init');
        //获取平台类型
        // this.platFormTypeService.getPlatFormType().then(
        //     res => {
        //         this.platFormType = res.resultContent;
        //         this.service.getPlatFormStatus().then(
        //             res => {
        //                 this.platFormStatus = res.resultContent;
        //                 this.backend(1, this.pp);
        //             }
        //         )

        //     }
        // ).catch(
        //     err => {
        //         console.error(err);
        //         this.notice.open('PF_MNG2.ERROR_PROMPT','获取云平台列表错误');
        //     }
        // )

        // this.commonService.getPlatFormTypes().then(
        //     res => {
        //         this.platFormType = res;
        //     }
        // ).then(
        //     res => {
        //         this.commonService.getPlatFormStatus().then(
        //             res => {
        //                 this.platFormStatus = res;
        //                 this.backend(1, this.pp);
        //             }
        //         )
        //     }
        //     ).catch(
        //     err => {
        //         console.error(err);
        //         this.notice.open('PF_MNG2.ERROR_PROMPT', '获取云平台列表错误');
        //     }
        //     )
        // this.backend(1, this.pp);
    }

    //删除按钮
    remove() {
        console.log('remove');
        let platForm: Platform = this.getPlatForm();
        if (!platForm) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.SELECT_PLATFORM');
        } else if(platForm.status!=0){
            this.notice.open('COMMON.OPERATION_ERROR','PF_MNG2.CANT_DELETE_UNINITIALIZED_PF');//只能删除初始化状态的云平台
        }else{
            this.removeConfirm.open('PF_MNG2.DELETE_PLATEFORM', 'PF_MNG2.CONFIRM_DELETE_PF^^^' + platForm.name ) //DELETE_PLATEFORM_WARNING=>删除警告
        }
    }

    //启用按钮
    enable() {
        console.log('enable');
        let platForm: Platform = this.getPlatForm();
        if (!platForm) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.SELECT_PLATFORM');
        }else if(platForm.status==0){
            this.notice.open('COMMON.OPERATION_ERROR','不能启用初始化初始化状态云平台，请先重置资源并启用平台');//不能启用初始化云平台
        }else if(platForm.status==1){
            this.notice.open('COMMON.OPERATION_ERROR','PF_MNG2.PLATFORM_ALEADRY_ENABLED');//云平台状态已启用
        }else{
            this.enableConfirm.open('PF_MNG2.ENABLE_PLATFORM', 'PF_MNG2.CONFIRM_ENABLE_PF^^^'+platForm.name)
        }
    }

    //禁用按钮
    disable() {
        console.log('disable');
        let platForm: Platform = this.getPlatForm();
        if (!platForm) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.SELECT_PLATFORM');
        } else if(platForm.status==0){
            this.notice.open('COMMON.OPERATION_ERROR','不能禁用初始化初始化状态云平台，请先重置资源并启用平台');//不能禁用初始化云平台
        }else if(platForm.status==2){
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.PLATFORM_ALEADRY_DISALED'); //云平台状态已禁用
        }else {
            this.disableConfirm.open('PF_MNG2.DISABLE_PLATFORM', 'PF_MNG2.CONFIRM_DISABLE_PF^^^' + platForm.name)
        }
    }

    // 创建按钮
    create() {
        //跳转
        console.log('create');
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step1');
    }

    // 选择云平台
    switchSelectIndividual(id: number) {
        console.log(id);
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].isSelected = false;
        }
        this.platforms[id].isSelected = true;
    }

    // 删除弹出框确认按钮
    removeCof() {
        //调用接口
        let platForm: Platform = this.getPlatForm();

        //调用接口
        this.service.deletePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.backend(this.currPage, 10);
                    //this.deleteAryByIndex(this.platforms , platForm.id)
                }

            }
        ).catch(
            err => {
                console.error('error');
                this.notice.open('PF_MNG2.ERROR_PROMPT', 'PF_MNG2.DLETE_PLATFORM_EXCEPTION_TRY_AGAIN');
            }
            );
    }

    // 启用弹出框确认按钮
    enableCof() {
        //调用接口
        let platForm: Platform = this.getPlatForm();
        this.service.activePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    // this.notice.open('确认', "启用成功");
                    this.backend(this.currPage, 10);
                }
            }
        ).catch(
            err => {
                console.error('error');
                this.notice.open('PF_MNG2.ERROR_PROMPT', 'PF_MNG2.ENABLE_PLATFORM_EXCEPTION_TRY_AGAIN');
            }
            )
    }

    // 禁用弹出框确认按钮
    disableCof() {
        let platForm: Platform = this.getPlatForm();
        this.service.disablePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    // this.notice.open('确认', "禁用成功");
                    this.backend(this.currPage, 10);
                }
            }
        ).catch(
            err => {
                this.notice.open('PF_MNG2.ERROR_PROMPT', 'PF_MNG2.DIABLE_PLATFORM_EXCEPTION_TRY_AGAIN');
            }
            )
    }

    ccf() {

    }

    nof() {

    }

    // 获得当前选中的平台
    getPlatForm() {
        let platForm: Platform;
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].isSelected == true) {
                platForm = this.platforms[i];
            }
        }
        return platForm;
    }
    //名字模糊查询
    keyup:string='';
    search(){
        console.log(this.keyup);
        this.pagination.paging(1); 
    }
    // 获得云平台list
    backend(page: number, size: number) {
        this.layoutService.show();
        this.tp = 0;
        this.service.getPlatforms(page, size,this.keyup).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;
                    let backend = new Array<Platform>();
                    // let platFormTypes = this.platFormType;
                    // let platFormStatus = this.platFormStatus;
                    for (let content of resultContent) {
                        let platform = new Platform();

                        platform.id = content.id;
                        // platform. = content.
                        platform.name = content.name;
                        platform.platformType = content.platformType;
                        // for (let item of platFormTypes) {
                        //     if (content.platformType == item.value) {
                        //         platform.platformType = item.displayValue
                        //     }
                        // }
                        platform.uri = content.uri;
                        platform.userName = content.userName;
                        platform.passwd = content.passwd;
                        platform.description = content.description;
                        platform.version = content.version;
                        platform.regionId = content.regionId;
                        platform.regionName = content.regionName;
                        platform.dataCenter = content.dataCenter;
                        platform.status=content.status;
                        // for (let item of platFormStatus) {
                        //     if (content.status == item.value) {
                        //         platform.status = item.displayValue
                        //     }
                        // }
                        platform.healthFlag = content.healthFlag;
                        platform.isSelected = false;

                        backend.push(platform);
                    }
                    let pageInfo = response.pageInfo;

                    this.tp = pageInfo.totalPage;
                    this.currPage=pageInfo.currentPage;
                    this.platforms = backend;
                } else {
                    this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_INFO_ERROR');
                    console.log(response);
                }
                this.layoutService.hide();
            }
        ).catch(
            // function () {
            //     // this.notice.open('COMMON.ERROR','PF_MNG2.GET_INFO_ERROR');
            //     console.error('error');
            // }
            err => {
                this.layoutService.hide();
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_PLATFORM_ERROR');
            }
            );
    }
    paging(page) {
        page = page < 1 ? 1 : page > this.tp ? this.tp : page;   //判断分页是否非法
        if (this.currPage == page) return;   //如果点击的是当前的page 则不再执行
        this.currPage = page;
        this.backend(this.currPage, 10);
    }
    //deleteAryByIndex (items : Array<Platform> , index : number){
    //    let newAr : Array<Platform> = new Array<Platform>();
    //    for(let i = 0 ; i < items.length ; i ++){
    //        if(items[i].id != index){
    //            newAr.push(items[i]);
    //        }
    //    }
    //    return newAr;
    //}

    //去详情
    godetail(item){
        console.log(item);        
        item.status!='0'&&this.router.navigate(["pf-mng2/pf-mng-detail", {id:item.id,type:item.platformType,name:item.name}]);
        item.status=='0'&&this.resetInit(item);
    }
    //初始化状态平台充值资源
    resetInit(item){
        this.idService.setPlatformId(item.id);
        if(item.platformType=='2'||item.platformType=='0'){
            this.router.navigate(["pf-mng2/cl-mng/cre-step2", { type: item.platformType }]);
        }else if(item.platformType=='3'){
            this.router.navigate(["pf-mng2/cl-mng/desk-cloud-cre-step2", { type: item.platformType }]);             
        }
    }

    //管理启动盘
    goDiskMng(){
        let platForm: Platform = this.getPlatForm();
        if (!platForm) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.SELECT_PLATFORM');
        } else if(platForm.status==0){
            this.notice.open('COMMON.OPERATION_ERROR','不能操作初始化初始化状态云平台，请先重置资源并启用平台');//不能操作初始化云平台
        }else if(platForm.platformType=="3"){
            this.notice.open('操作错误','桌面云暂不支持启动盘功能')
        }else{
            this.router.navigate(["pf-mng2/pf-mng-bootDisk", {id:platForm.id,type:platForm.platformType,name:platForm.name}]);
        }
        
    }
    //管理云主机规格(只针对openstack平台)
    goVmSpec(){
        let platForm: Platform = this.getPlatForm();
        if (!platForm) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.SELECT_PLATFORM');
        } else if(platForm.status==0){
            this.notice.open('COMMON.OPERATION_ERROR','不能操作初始化初始化状态云平台，请先重置资源并启用平台');//不能操作初始化云平台
        }else if(platForm.platformType=="3"){
            this.notice.open('操作错误','桌面云暂不支持规格设置')
        }else{
            this.router.navigate(["pf-mng2/pf-mng-cloudHostSpec", {id:platForm.id,type:platForm.platformType,name:platForm.name}]);
        }
    }
}
