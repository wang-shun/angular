import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org, Member, Resource } from '../model/org-mng.org.model';
import { EntResource } from '../model/ent-resource-obj.model';

@Component({
  selector: 'org-mng-cr',
  templateUrl: '../template/org-mng-cr.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngCrComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: OrgMngService
  ) { }

  @Input()
  isEdit: boolean;
  @Input()
  editId: string;

  @ViewChild("orgForm")
  'orgForm': NgForm;

  org: Org = new Org();
  members: Array<Member>;
  users: Array<Member>;
  curEntResource: EntResource;

  countAvailable: EntResource;
  maxAvailable: Resource;
  resource: Resource = new Resource();
  ngOnChanges(changes: SimpleChanges) {
    this.curEntResource = this.service.entResourceObj;
    this.countAvailable = new EntResource();
    this.maxAvailable = new Resource();
    //计算可分配额度
    this.countAvailable.cpuQuota = this.curEntResource.cpuQuota - this.curEntResource.usedCpuQuota;
    this.countAvailable.memQuota = this.curEntResource.memQuota - this.curEntResource.usedMemQuota;
    this.countAvailable.physicalMachineQuota = this.curEntResource.physicalMachineQuota - this.curEntResource.usedPhysicalMachineQuota;
    this.countAvailable.storageQuota = this.curEntResource.storageQuota - this.curEntResource.usedStorageQuota;
    this.countAvailable.snapshotQuota = this.curEntResource.snapshotQuota - this.curEntResource.usedSnapshotQuota;
    this.countAvailable.imageQuota = this.curEntResource.imageQuota - this.curEntResource.usedImageQuota;
    this.countAvailable.floatIpQuota = this.curEntResource.floatIpQuota - this.curEntResource.usedFloatIpQuota;
    //计算MAX额度
    this.maxAvailable.vcpu = this.curEntResource.cpuQuota - this.curEntResource.usedCpuQuota + this.resource.vcpu
    this.maxAvailable.mem = this.curEntResource.memQuota - this.curEntResource.usedMemQuota + this.resource.mem
    this.maxAvailable.physical = this.curEntResource.physicalMachineQuota - this.curEntResource.usedPhysicalMachineQuota + this.resource.physical
    this.maxAvailable.storage = this.curEntResource.storageQuota - this.curEntResource.usedStorageQuota + this.resource.storage
    this.maxAvailable.snapshot = this.curEntResource.snapshotQuota - this.curEntResource.usedSnapshotQuota + this.resource.snapshot
    this.maxAvailable.image = this.curEntResource.imageQuota - this.curEntResource.usedImageQuota + this.resource.image
    this.maxAvailable.ipaddress = this.curEntResource.floatIpQuota - this.curEntResource.usedFloatIpQuota + this.resource.ipaddress
    console.log(this.curEntResource);
    console.log(this.countAvailable);
    this.org = new Org();
    this.org.resource = new Resource();
    console.log(this.editId);
    if (this.isEdit) {
      this.getUserList();
      this.getOrgDetail();
      this.org.resource = new Resource();
      this.service.getOrgResourceById(this.editId)
        .then(
        res => {
          console.log("部门资源", res);
          res.resultContent.usedMem /= 1024;
          res.resultContent.mem /= 1024;
          this.resource = res.resultContent;
          //计算MAX额度
          this.maxAvailable.vcpu = this.curEntResource.cpuQuota - this.curEntResource.usedCpuQuota + this.resource.vcpu
          this.maxAvailable.mem = this.curEntResource.memQuota - this.curEntResource.usedMemQuota + this.resource.mem
          this.maxAvailable.physical = this.curEntResource.physicalMachineQuota - this.curEntResource.usedPhysicalMachineQuota + this.resource.physical
          this.maxAvailable.storage = this.curEntResource.storageQuota - this.curEntResource.usedStorageQuota + this.resource.storage
          this.maxAvailable.snapshot = this.curEntResource.snapshotQuota - this.curEntResource.usedSnapshotQuota + this.resource.snapshot
          this.maxAvailable.image = this.curEntResource.imageQuota - this.curEntResource.usedImageQuota + this.resource.image
          this.maxAvailable.ipaddress = this.curEntResource.floatIpQuota - this.curEntResource.usedFloatIpQuota + this.resource.ipaddress
        }
        )
        .catch(err => {
          console.error(err);
        });
    }

  }
  ngOnInit() {

  }
  //获取机构用户for leader列表
  getUserList() {
    this.service.getUserByOrg(this.editId).then(
      res => {
        console.log('getNoMngUser', res);
        this.users = res.resultContent;
      }
    ).catch(
      err => {
        console.error(err);
      }
      )
  }
  //选择机构成员
  selectMember(member) {
    console.log(member)
    member.selected = !member.selected;
    this.org.members = this.service.members.filter(ele => {
      if (ele.selected == true) {
        return ele
      }
    })
    console.log(this.org.members)
  }
  获取部门详情
  getOrgDetail() {
    this.service.getOrgById(this.editId)
      .then(
      res => {
        console.log("部门基本", res);
        this.org = res.resultContent;
      }
      )
      .catch(err => {
        console.error(err);
      });
  }
  //保存 给父组件调用
  save() {
    this.org.resource = this.resource;
    if (this.orgForm.valid) {
      this.org.resource.mem *= 1024;
      this.org.resource.usedMem*=1024;
      if (!this.isEdit) {
        console.log('new', this.org)
        return this.service.createOrg(this.org)
      } else {
        console.log('edit', this.org)
        return this.service.editOrg(this.editId, this.org);
      }
    } else {
      return Promise.reject("error");
    }
    // 

    //  if (this.orgForm.invalid) {

    //     } else if (this.isEdit) {
    //         return this.service.editOrg(this.editId, this.org);
    //     } else {
    //         this.service.createOrg(this.org);
    //     }
  }

  //同步countBar数据
  outputValue(e, arg1, arg2) {
    this.resource[arg1] = e;
    if (this.maxAvailable[arg1] - e >= 0) {
      this.countAvailable[arg2] = this.maxAvailable[arg1] - e;
    }
  }
  /////////////////////edit   getUserByOrg

}
