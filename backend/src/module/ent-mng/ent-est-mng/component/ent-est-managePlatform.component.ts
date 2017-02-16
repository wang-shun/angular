import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemLoader, RestApi, RestApiCfg,LayoutService, NoticeComponent, PopupComponent, SystemDictionaryService, SystemDictionary  } from '../../../../architecture';
import { EntProdItem, EntEst,Platform} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-managePlatform',
  templateUrl: '../template/ent-est-managePlatform.component.html',
  styleUrls: ['../style/ent-est-managePlatform.less'],
  providers: [EntEstCreService]
}) 
export class EntEstManagePlatformComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;


  private platformLoader : ItemLoader<Platform> = null; //未选择可用平台 

  private selectedPlatformLoader : ItemLoader<Platform> = null; //已选择可用平台 
  
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
    this.platformLoader = new ItemLoader<Platform>(false,'加载未选择可用平台列表错误','',restApiCfg,restApi);
    this.selectedPlatformLoader = new ItemLoader<Platform>(false,'加载已选择可用平台列表错误','',restApiCfg,restApi);


    // this.platformLoader.MapFunc = (source:Array<any>,target:Array<Platform>)=>{
    //   let obj = new Platform();
    //   for(let item of source){
    //     obj.name = item.name;
    //     target.push(obj);
    //   }
    // }

    //处理数据字典
    // this.platformLoader.Trait = (target:Array<Platform>)=>{
      
    // }

    this.platformLoader.FakeDataFunc = (target:Array<Platform>)=>{
      target.splice(0, target.length);

      let _platform = new Platform();
      _platform.name = '上海A平台';
      _platform.type = '777';
      _platform.status = '1';
      target.push(_platform);  

      let _platform2 = new Platform();
      _platform2.name = '上海B平台';
      _platform2.type = '666';
      _platform2.status = '1';
       target.push(_platform2); 

        let _platform3 = new Platform();
       _platform3.name = '上海C平台';
      _platform3.type = '888';
      _platform3.status = '0';
       target.push(_platform3); 
    }

    // this.selectedPlatformLoader.MapFunc = (source:Array<any>,target:Array<Platform>)=>{
    //   let obj = new Platform();

    //   for(let item of source){
    //     obj.name = item.name;
    //     target.push(obj);
    //   }
    // }

    this.selectedPlatformLoader.FakeDataFunc = (target:Array<Platform>)=>{

      target.splice(0, target.length);

      let _platform = new Platform();
      _platform.name = '上海B平台';
      _platform.type = '888';
      _platform.status = '1';
      target.push(_platform);  
    }
  }

  ngOnInit() {
    this.layoutService.show();
    this.platformLoader.Go()
    .then(success=>{
      return this.selectedPlatformLoader.Go();
    })
    .then(success=>{
      this.layoutService.hide();
    })
    .catch(err=>{
      this.layoutService.hide();
    })

  }

  selectItem(index:number,platform:Platform){
    this.platformLoader.Items.splice(index);  
    this.selectedPlatformLoader.Items.push(platform);
  }

//返回/取消
cancel(){
  this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
}

//保存
save(){

}

}