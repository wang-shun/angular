import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent  } from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';

@Component({
  selector: 'cl-mng-list',
  templateUrl: '../template/cl-mng-list.component.html',
  styleUrls: [
  ],
  providers: []
})
export class ClMngListComponent implements OnInit{


    constructor(
        private layoutService: LayoutService,
        private service : ClMngListService
    ) {}

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;



    //初始化
    ngOnInit(){
        console.log('init');
        this.backend(1, this.pp);
    }

    //删除按钮
    remove (){
        console.log('remove');
    }
    //启用按钮
    enable (){
        console.log('enable');
    }
    //禁用按钮
    disable (){
        console.log('disable');
    }

    //创建按钮
    create (){
        //跳转
        console.log('create');
    }


    backend(page: number, size: number){
        this.layoutService.show();
        this.tp = 0;
        this.service.getPlatforms(page, size).then(
            response => {
                console.log(response);
                this.layoutService.hide();
            }
        );

    }


}
