/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

// import { CreStep5Model }  from '../model/cre-step5.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { ClMngCreStep6Service } from '../service/cl-mng-cre-step-6.service';

import { ClMngListService } from '../service/cl-mgn-list.service';

import { CreStep6Model } from '../model/cre-step6.model';

import { ClMngIdService } from '../service/cl-mng-id.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

@Component({
    selector: 'cl-mng-cre-step-6',
    templateUrl: '../template/cl-mng-cre-step-06.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep6Component implements OnInit {


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ClMngCreStep6Service,
        private commonService:ClMngCommonService,
        private idService: ClMngIdService,
        private operationService: ClMngListService,
        private layoutService:LayoutService
    ) { }

    creStep6Model: Array<CreStep6Model> = new Array<CreStep6Model>();
    platformType: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })       
        console.log(this.commonService.imageFormatList);
        let id: string = this.idService.getPlatformId();
        this.layoutService.show();
        this.service.getImageList(id).then(
            res => {
                console.log('image',res);
                this.creStep6Model = res.resultContent;
                this.layoutService.hide();
            }
        ).catch(
            err => {
                console.error('error');
                this.layoutService.hide();
            }
            )
    }
    previous() {
        // this.router.navigateByUrl('pf-mng2/cl-mng/cre-step5');
        // if (this.platformType == '0') {
            this.router.navigate(["pf-mng2/cl-mng/cre-step5", { type: this.platformType }]);
        // } else if (this.platformType == '2') {
        //     this.router.navigate(["pf-mng2/cl-mng/cre-step4", { type: this.platformType }]);
        // }
    }
    cancel() {
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
    next() {
        console.log('next',this.creStep6Model);
        let id: String = this.idService.getPlatformId();
        // id = "4f565fe7-09fc-4b8b-8227-a0b5b8b1eb6c";        
        this.service.putImageList(this.creStep6Model).then(
            res => {
                this.activePlatform();
            }
        ).catch(
            err => {
                console.error('err');
            }
            )
    }
    // PF_MNG2.ENABLE_PLATFORM
    private activePlatform() {
        let id: String = this.idService.getPlatformId();
        this.layoutService.show();
        this.operationService.activePlatform(id).then(
            res => {
                this.layoutService.hide();
                this.router.navigateByUrl('pf-mng2/cl-mng/cl-mng');
            }
        ).catch(
            err => {
                this.layoutService.hide();
                console.error('err');
            }
            )
    }
}
