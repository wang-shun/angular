﻿import { NgModule } from '@angular/core';

import { PhyPoolModule } from './phy-pool/phy-pool.module';
import { PhyNetModule } from './phy-net-mng/phy-net-mng.module';
import { PhysicalMngModule } from './physical-mng/physical-mng.module';
import { PhyImgModule } from './phy-img-mng/phy-img-mng.module';
import { PhyImgMngImgListModule } from './phy-img-mng-imglist/phy-img-mng-imglist.module'

@NgModule({
    imports: [
        PhyPoolModule,
		PhysicalMngModule,
        PhyNetModule,
        PhyImgModule,
        PhyImgMngImgListModule
    ],
    declarations: [],
    exports: [
        PhyPoolModule,
		PhysicalMngModule,
        PhyNetModule,
        PhyImgModule,
        PhyImgMngImgListModule
    ],
    providers: []
})

export class PhyMngModule { }
