import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { AccountMngService } from '../service/account-mng.service';

import { Account, Role,Organization } from '../model/account.model'

@Component({
  selector: 'account-mng-cr-local',
  templateUrl: '../template/account-mng-cr-local.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrLocalComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: AccountMngService
  ) { }

  @Input()
  isEdit: boolean;
  account = new Account();
  roles: Array<Role>;
  orgs:Array<Organization>;
  ngOnInit() {
    //获取所有角色
    this.service.getRoleList().then(
      res => {
        console.log('角色',res);
        this.roles = res.resultContent;
      }
    ).catch(err => {
      console.error(err);
    })
    //获取所有机构
    this.service.getOrgList().then(
      res => {
        console.log('机构',res);
        this.orgs = res.resultContent;
      }
    ).catch(err => {
      console.error(err);
    })
  }
  //选择角色
  selectRole(idx) {
    console.log(idx);
    this.roles.forEach(ele => {
      ele.selected = false;
    });
    this.roles[idx].selected = true;
    this.account.roles = this.roles.filter(ele => {
      if (ele.selected) {
        return ele;
      }
    })
    console.log(this.account.roles);
  }
  //选择部门
  selectOrg(idx){
     console.log(idx);
    this.orgs.forEach(ele => {
      ele.selected = false;
    });
    this.orgs[idx].selected = true;
    this.account.organizations = this.orgs.filter(ele => {
      if (ele.selected) {
        return ele;
      }
    })
    console.log(this.account.organizations);
  }
  save(){
      console.log(this.account);
      return this.service.createAccount(this.account)
  }
}
