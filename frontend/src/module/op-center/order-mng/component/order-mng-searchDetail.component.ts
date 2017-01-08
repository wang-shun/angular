import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { SearchOrderDetail } from '../model';
import {DictService} from '../../../../architecture/core/service/dict-service';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-searchDetail',
  templateUrl: '../template/order-mng-searchDetail.component.html',
  styleUrls: ['../style/order-mng-searchDetail.less'],
  providers: []
}) 
export class OrderMngSearchDetailComponent implements OnInit {
  @Input('detail')
  private _detail:SearchOrderDetail;
  private showInstance : boolean = true;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) {
   
  }

  ngOnInit() {
      for(let item of this._detail.subInstanceList){
        if(item.serviceType = "1"){
          this.showInstance = false;
        }
      }
  }

}