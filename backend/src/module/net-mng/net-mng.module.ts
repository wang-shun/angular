﻿import { NgModule } from '@angular/core';

import { OpenstackModule } from './openstack/openstack.module';
import { IpMngModule } from './vm-mng/ip-mng/ip-mng.module';
import { VMMngModule } from './vm-mng/vm-mng.module';
import { VmMngDbtModule } from './vm-mng-dbt/vm-mng-dbt.module';
import { VmMngNsxModule } from './vm-mng-nsx/vm-mng-nsx.module';
@NgModule({
    imports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmMngDbtModule,
        VmMngNsxModule
    ],
    declarations: [],
    exports: [
        OpenstackModule,
        IpMngModule,
        VMMngModule,
        VmMngDbtModule,
        VmMngNsxModule
    ],
    providers: []
})

export class NetMngModule { }