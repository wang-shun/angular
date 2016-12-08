class Organization {
  "key": string;
  "num": number;
  "value": string
}
class Role {
  "key": string;
  "num": number;
  "value": string
}
class Member {
  "description": string;
  "email": string;
  "id": string;
  "isAD": boolean;
  "loginName": string;
  "name": string;
  "orgs": Array<Organization>;
  "phone": string
  "roles": Array<Role>;
  "type": number;
  "userName": string;
  "selected": boolean
}
class Platform {
  "dataCenter": string;
  "description": string;
  "id": string;
  "name": string;
  "passwd": "xxxxxx";
  "platformType": number;
  "platformTypeName": string;
  "regionId": string;
  "supportChange": boolean;
  "uri": string;
  "userName": string;
  "version": string
}
class Org {
  "description": string;
  "id": string;
  "leaderId": string;
  "members": Array<Member>;
  "name": string;
  "platforms": Array<Platform>;
  "resource": Resource;
  constructor() {
    this.resource = new Resource;
  }
}
class Resource {
  "disk": number;
  "image": number;
  "ipaddress": number;
  "mem": number;
  "physical": number;
  "snapshot": number;
  "storage": number;
  "vcpu": number;
  constructor() {
    this.disk = 0;
    this.image = 0;
    this.ipaddress = 0;
    this.mem = 0;
    this.physical = 0;
    this.snapshot = 0;
    this.storage = 0;
    this.vcpu = 0;
  }
}
class OrgPer {
  "id": string;
  "name": string;
  "headCount": number;
  "leaderId": string;
  "leaderName": string;
  "status": number;
  "description": string;
  "members": string;
  "platforms": string;
}
export {
  Org,
  OrgPer,
  Member,
  Resource
}
