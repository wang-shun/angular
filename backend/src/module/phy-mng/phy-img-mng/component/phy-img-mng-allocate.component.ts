import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
     ConfirmComponent, SystemDictionary, SelectboxComponent } from '../../../../architecture';

//model
import { PhyImgSource } from '../model/phy-img-source.model';
import { Pool } from'../model/pool.model';
//service
import { PhyImgSourceService } from'../service/phy-img-source.service';

@Component({
    selector: "phy-mng/phy-img/phy-img-mng-allocate",
    templateUrl: "../template/physical-image-al-pool.html",
    styleUrls: [],
    providers: []
}
)
export class PhyImgMngAllocateComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private router2 : ActivatedRoute,
        private service: PhyImgSourceService
    ){ }
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("selectbox")
    selectbox: SelectboxComponent;
    inUsedPools:Array<Pool>;
    noUsedPools:Array<Pool>;

    sourceId:string;

    ngOnInit() {

         this.router2.params.forEach((params: Params) => {
			this.sourceId = params['pmImagePoolId'];
			console.log("接收的sourceId:" + this.sourceId);
			
		});
        this.allocatePool();
    }

//分配
    allocatePool(){
        
        this.layoutService.show();
        this.service.getAllo(this.sourceId)
            .then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100== response["resultCode"]){
                        this.inUsedPools = response.resultContent.inUsedPools;
                        this.noUsedPools = response.resultContent.noUsedPools;

                    }else{
                        alert("Res.sync error");
                    }
            })
        .catch((e)=>this.onRejected(e));

    }

    commitAllo(){
        let idlist:string="";
        this.inUsedPools.forEach((e)=>{
            idlist = idlist + e.pmPoolId+","
        })
        idlist = idlist.slice(0, idlist.length-1);

        console.log("idlist="+idlist);
        this.layoutService.show();
        this.service.commitAllo(this.sourceId, idlist)
            .then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100== response["resultCode"]){
                        this.showAlert("PHY_IMG_MNG.ALLOCATE_SUCCESS", this.backToSource);
                        
                    }else{
                        alert("Res.sync error");
                    }
                })
                .catch((e)=>this.onRejected(e));
        
    }
    cancelAllo(){
        this.backToSource();
    }
    backToSource(){
        this.router.navigateByUrl('phy-mng/phy-img/phy-img-mng');
    }
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHY_IMG_MNG.ERROR", this.error);
    }
    error(){

    }

    showAlert(msg: string, fun:Function): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;

        this.notice.nof=()=>{
            console.log("function");
            fun.bind(this)();
        }
        this.notice.open();
    }
}