﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep02Service } from '../service/pf-conn-cre-step-02.service';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf-conn-cre-step-02.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep02Component implements OnInit {
  constructor(
      private service: PfConnCreStep02Service,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  /**
  * 取消按钮事件处理
  */
  cancel() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
  }

  previous() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01/1");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03");
  }
}
