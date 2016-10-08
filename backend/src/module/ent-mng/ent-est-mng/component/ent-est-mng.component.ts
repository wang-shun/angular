import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstItem } from '../model/ent-est-item';


@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: [],
  providers: []
}) 
export class EntEstMngComponent implements OnInit {
  private entEstItems: EntEstItem[] = [];    
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
      
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  create() {
      this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
  }
}