import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent, ConfirmComponent, dictPipe } from '../../../../architecture';

import { PlatformDetailService } from '../service/pf-mng-detail.service';
import { ZoneListService } from '../service/cl-mng-cre-step-3.service';
import { StorageListService } from '../service/cl-mng-cre-step-4.service';


import { ClMngCommonService } from '../service/cl-mng-common.service';

//model
import { Platform } from '../model/platform.model';
import { ZoneListModel } from '../model/cre-step3.model';
import { StorageModel } from '../model/cre-step4.model';
import { VolumeTypeModel } from '../model/volumeType.model';

@Component({
    templateUrl: '../template/pf-mng-detail.component.html',
    styles: [
        // '../style/cl-mng.less'
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
    providers: []
})
export class PfDetailComponent implements OnInit {
    constructor(private layoutService: LayoutService,
        private route: Router,
        private router: ActivatedRoute,
        private zoneListService: ZoneListService,
        private storageListService:StorageListService,
        private platformDetailService: PlatformDetailService,
        private commonService: ClMngCommonService,
        private location: Location,
        private dictPipe: dictPipe,
    ) {
    }
    @ViewChild('removeConfirm')
    removeConfirm: ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('zoneSync') zoneSync;
    @ViewChild('hostSync') hostSync;
    @ViewChild('storageSync') storageSync;
    @ViewChild('memSync') memSync;


    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";
    // 云平台状态
    platFormStatus: Array<any> = new Array<any>();
    Tabels = [
        { name: 'PF_MNG2.BASIC_INFO', active: true },
        { name: 'PF_MNG2.ZONES_QUOTA', active: false },
        { name: 'PF_MNG2.STOARGE_QUOTA', active: false }
    ]
    platformId:string;
    platformName: string;
    platformType: string;
    platformTypes: Array<any> = new Array<any>();
    platformVersion: Array<any> = new Array<any>();
    regions: Array<any> = new Array<any>();
    platform: Platform = new Platform();
    //可用区列表
    zoneList: Array<ZoneListModel>;
    updateZoneList: Array<ZoneListModel>;

    hostList: ZoneListModel=new ZoneListModel();
    //初始化
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.platformId = params['id'];
            this.platformType = params['type'];
            this.platformName = params['name'];
            console.log(this.platformType);
        })
        //获取云平台类型列表
        this.layoutService.show();
        this.commonService.getPlatFormTypes()
            .then(
            res => {
                console.log(res);
                this.platformTypes = res;
            }
            ).then(() => {
                this.platformDetailService.getPlatform(this.platformId)
                    .then(
                    res => {
                        console.log('platform basic', res);
                        this.platform = res.resultContent;
                        this.platformTypes.forEach(ele => {
                            if (ele.value == this.platform.platformType) {
                                ele.isSelected = true;
                                this.getVersion(ele.code);
                            }else{
                                ele.isSelected = false;
                            }
                        })
                        this.getZoneList();
                        this.getStorageList();
                        this.getVolumeTypeList(this.platformId);
                        this.layoutService.hide();
                    }
                    )
            })
            .catch(
            err => {
                console.error('err');
                this.layoutService.hide();
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_INFO_ERROR');
            }
            )
        //获取区域列表
        this.commonService.getRegion()
            .then(

            res => {
                // console.log('region', res);
                this.regions = res;
            }
            ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_REGION_ERROR');
            }
            )

    }
    //切换TAB
    changeTab(item, index) {
        this.Tabels.forEach((ele) => {
            ele.active = false;
        })
        item.active = true;
    }
    //选择平台类型
    choosePlatFormType(item, index) {
        for (let i = 0; i < this.platformTypes.length; i++) {
            this.platformTypes[i].isSelected = false;
        }
        this.platformTypes[index].isSelected = true;
        this.platform.platformType = item.value;
        console.log(item);
        this.platform.version = '';
        this.getVersion(item.code);
    }
    //获取版本版本
    getVersion(code) {
        this.commonService.getVersion(code).then(
            res => {
                console.log(res);
                this.platformVersion = res
            }
        ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_VERSION_ERROR');
            }
            )
    }
    /////////////////////////////////////////////////////////////////////////////////////可用区
    //获取可用区列表
    getZoneList() {
        this.layoutService.show();
        this.zoneListService.getZone(this.platform.id).then(
            res => {
                this.zoneList = res.resultContent;
                this.zoneList.forEach(ele => {
                    ele.quotaPercentage =
                        ele.quotaPercentage ? ele.quotaPercentage : 0;
                    ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                })
                console.log('zoneList',res);
                this.layoutService.hide();
            }
        ).catch(err => {
            console.error('获取可用区列表出错', err)
            this.layoutService.hide();
        })
    }   
    //启用可用区
    enableZone(id: string) {
        if(this.platform.status!=1){
            this.notice.open('COMMON.OPERATION_ERROR','PF_MNG2.NONSUPPORT_CHANGES_STATE');
            return;
        }
        this.layoutService.show();
        this.platformDetailService.enableZone(id).then(res => {
            console.log(res)
            this.getZoneList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('启用可用区失败', err);
            this.layoutService.hide();
        })
    }
    //禁用可用区
    suspendZone(id: string) {
        if(this.platform.status!=1){
            this.notice.open('COMMON.OPERATION_ERROR','PF_MNG2.NONSUPPORT_CHANGES_STAT');
            return;
        }
        this.layoutService.show();
        this.platformDetailService.suspendZone(id).then(res => {
            console.log(res)
            this.getZoneList();
            this.layoutService.hide();
        }).catch(err => {
            this.layoutService.hide();
            console.error('禁用可用区失败', err);
        })
    }
    //更多操作
    tempZoneList: Array<ZoneListModel>=new Array<ZoneListModel>();
    editZone(zone, idx) {
        console.log(zone);
        console.log(this.tempZoneList);
        this.tempZoneList[idx]=new ZoneListModel();
        Object.assign(this.tempZoneList[idx], zone)
        this.zoneList[idx].isEdit = true;
    }
    saveZone(zone) {
        console.log(this.zoneList);
        this.zoneList.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        this.layoutService.show();
        this.zoneListService.putZone(this.platform.id,this.zoneList).then(res => {
            console.log(res);
            this.getZoneList();
            zone.isEdit = false;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();            
        })
    }
    cancelEdit(zone,idx) {
        console.log(this.tempZoneList[idx]);
        Object.assign(zone, this.tempZoneList[idx]);
        this.tempZoneList[idx]=new ZoneListModel();
        zone.isEdit = false;
    }

    //更新可用区弹出框
    updateZone() { 
        this.updateZoneList=new Array<ZoneListModel>(); 
        this.layoutService.show();      
        this.platformDetailService.getUpdateZoneList(this.platform.id).then(
            res => {
                this.updateZoneList = res.resultContent;
                if (this.updateZoneList.length == 0) {
                    this.notice.open('COMMON.PROMPT', 'PF_MNG2.NO_SYNC_ZONES')
                } else {
                    this.updateZoneList.forEach(ele => {
                        ele.quotaPercentage =
                            ele.quotaPercentage ? ele.quotaPercentage : 0;
                        ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                    })
                    console.log('同步', res);
                    this.zoneSync.open();
                    
                }
                this.layoutService.hide();
            }
        ).catch(err => {
            this.layoutService.hide();
            console.error('获取更新可用区列表出错', err);
        })
    }
    
    //同步更新宿主机信息get    
    updateHostPop(zoneId) {
        console.log(zoneId);
        this.layoutService.show();              
        this.platformDetailService.getUpdateZone(zoneId).then(
            res => {
                console.log('同步计算资源', res);
                if (res.resultCode == 100) {
                    if (res.resultContent) {
                        this.hostList = res.resultContent;
                        this.hostSync.open(this.hostList);
                    } else {
                        this.notice.open('COMMON.PROMPT', 'PF_MNG2.NO_SYNC_COMPUTING_SOURCE')
                    }

                }
                this.layoutService.hide();
            }
        ).catch(err => {
            console.error('获取同步计算资源出错', err)
            this.layoutService.hide();
        })
    }
    // otUpdateResource() {
    
    // }
    ccf() {

    }
    /////////////////////////////////////////////////////////////////////////////////////////////存储区
    //获取存储区列表
    storageList: Array<StorageModel> = new Array<StorageModel>();
    getStorageList(){
        this.layoutService.show();
         this.storageListService.getStorage(this.platform.id).then(
            res => {
                this.storageList = res.resultContent;
                this.storageList.forEach(ele => {
                    ele.quota=
                        ele.quota?ele.quota:0;
                    ele.quotaPercentDisplay = ele.quota * 100;
                    ele.valid=true;                    
                })
                //Openstack类型同步volumeType信息
                // if (this.platformType == '0') {
                //     this.service.getvolumeType(platFormId).then(
                //         res => {
                //             console.log(res);
                //         }
                //     ).catch(err => {
                //         console.error(err);
                //     });
                // }
                console.log('sorageList',this.storageList);
                this.layoutService.hide();
            }
        ).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
            }
            )
    }
    //启用存储区
    enableStorage(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.enableStorage(id).then(res => {
            console.log(res)
            this.getStorageList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('启用存储区失败', err);
            this.layoutService.hide();
        })
    }
    //禁用存储区
    suspendStorage(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.suspendStorage(id).then(res => {
            console.log(res)
            this.getStorageList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('禁用存储区失败', err);
        })
    }
    //更多操作
    
    tempStorageList: Array<StorageModel>=new Array<StorageModel>();
    editStorage(storage, idx) {
        this.tempStorageList[idx]=new StorageModel();
        Object.assign(this.tempStorageList[idx], storage)
        this.storageList[idx].isEdit = true;
    }

    keepSame(item) {
        // if (this.platformType == '2') {
            let sum:number=0;
            for (let storage of this.storageList) {
                storage.valid=true;
                if (storage.id == item.id) {
                    // storage.displayName = item.displayName;
                    // storage.description = item.description;
                    storage.replica = item.replica;
                    sum+=storage.quotaPercentDisplay;
                }
            }
            item.valid=
                sum>100?false:true;
            console.log(sum);
            console.log(item.valid);
            // for(){

            // }
        // }
    }

    saveStorage(storage) {
        console.log(this.tempStorageList);        
        let valid:boolean=true;
        this.storageList.forEach(ele => {
            if(ele.valid==false){
               return valid=false;
            }
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        console.log(valid);
        if(!valid){
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.STOARGE_QUOTA_SET_ERROR');//存储区配额设置错误，同一存储区配额总额设置超额
            return;
        }
        this.layoutService.show();
        this.storageListService.putStorage(this.platform.id,this.storageList).then(res => {
            console.log(res);
            this.getStorageList();
            storage.isEdit = false;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    cancelEditStorage(storage,idx) {
        console.log(this.tempStorageList[idx]);
        Object.assign(storage, this.tempStorageList[idx]);
        this.tempStorageList[idx]=new StorageModel();
        storage.isEdit = false;
    }

    //更新存储区弹出框
    updateStorageList:Array<StorageModel>
    updateStorageListPop() {
        this.layoutService.show();
        this.platformDetailService.getUpdateStorageList(this.platform.id).then(
            res => {
                this.layoutService.hide();
                this.updateStorageList = res.resultContent;
                if (this.updateStorageList.length == 0) {
                    this.notice.open('COMMON.PROMPT', 'PF_MNG2.NO_SYNC_ZONES')  //暂时没有可同步可用区信息
                } else {
                    this.updateStorageList.forEach(ele => {
                        ele.quota=
                            ele.quota?ele.quota:0;
                        ele.quotaPercentDisplay = ele.quota * 100;
                    })
                    console.log('同步', res);
                    this.storageSync.open();
                }
            }
        ).catch(err => {
                this.layoutService.hide();            
            console.error('获取更新可用区列表出错', err)
        })
    }
    //同步存储空间get
    updateStorageMem: StorageModel;
    updateStorage(StorageId) {
        console.log(StorageId);
        this.layoutService.show();
        this.platformDetailService.getUpdateStorageCount(StorageId).then(
            res => {
                this.layoutService.hide();                
                console.log('同步存储空间', res);
                if (res.resultCode == 100) {
                    if (res.resultContent) {
                        this.updateStorageMem = res.resultContent;
                        this.memSync.open();
                    } else {
                        this.notice.open('COMMON.PROMPT', 'PF_MNG2.NO_SYNC_COMPUTING_SOURCE')
                    }

                }
            }
        ).catch(err => {
                this.layoutService.hide();            
            console.error('获取同步存储空间出错', err)
        })
    }
    //volumeType信息
    volumeTypeList: Array<VolumeTypeModel> = new Array<VolumeTypeModel>();
    //获取volumeType列表
    getVolumeTypeList(id: string) {
        this.platformDetailService.getVolumeTypeList(id).then(
            res => {
                console.log('volumeType',res);
                this.volumeTypeList = res.resultContent
            }
        ).catch(err => {
            console.error(err);
        });
    }
    //启用VolumeType
    enableVolumeType(id:string){
        this.layoutService.show();
        this.platformDetailService.enableVolumeype(id).then(
            res => {
                this.layoutService.hide();
                console.log('volumeType',res);
                this.getVolumeTypeList(this.platformId);
            }
        ).catch(err => {
            this.layoutService.hide();
            console.error(err);
        });
    }   
    //禁用Volumetype
    suspendVolumeType(id:string){
        this.layoutService.show();
        this.platformDetailService.suspendVolumeType(id).then(
            res => {
                this.layoutService.hide();
                console.log('volumeType',res);
                this.getVolumeTypeList(this.platformId);
            }
        ).catch(err => {
            this.layoutService.hide();
            console.error(err);
        });
    }
    //操作volumeType
    tempVolumeTypeList: Array<VolumeTypeModel>=new Array<VolumeTypeModel>();
    editVolumeType(volumeType, idx) {
        this.tempVolumeTypeList[idx]=new VolumeTypeModel();
        Object.assign(this.tempVolumeTypeList[idx], volumeType)
        this.volumeTypeList[idx].isEdit = true;
    }
    saveVolumeType(volumeType) {
        console.log(this.tempVolumeTypeList);        
        this.layoutService.show();
        this.platformDetailService.putVolumeTypeList(this.platformId,this.volumeTypeList).then(res => {
            console.log(res);
            this.getVolumeTypeList(this.platformId);
            volumeType.isEdit = false;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    cancelEditVolumeType(volumeType,idx) {
        console.log(this.tempVolumeTypeList[idx]);
        Object.assign(volumeType, this.tempVolumeTypeList[idx]);
        this.tempVolumeTypeList[idx]=new VolumeTypeModel();
        volumeType.isEdit = false;
    }
    //同步更新存储类型
    updateVolumetypeListPop(){
        this.platformDetailService.getUpdateVolumeType(this.platformId).then(res=>{
            console.log('updateVolumetype',res);
        })
    }

    //返回
    back() {
        this.location.back();
    }
    goList() {
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    save() {
        console.log(this.platform);
        if (!this.platform.name) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.PLATFORM_NAME_REQUIRED');
        }
        if (!this.platform.dataCenter) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.DATA_CENTER_REQUIRED');
        }
        if (!this.platform.uri) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.ADDRESS_REQUIRED');
        }
        this.layoutService.show();
        this.platformDetailService.putPlatform(this.platform).then(res => {
            console.log(res);
            this.layoutService.hide();
            this.location.back();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }

}
