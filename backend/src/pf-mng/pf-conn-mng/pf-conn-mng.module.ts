import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../common_components/common.module';

import { PaginationComponent } from '../../common_components/pagination/component/pagination.component';

// pf-conn-mng-cre
import { PfConnMngComponent } from './component/pf-conn-mng.component';
import { PfConnMngService } from './service/pf-conn-mng.service';

import { PfCreStep01Component } from './component/pf-cre-step-01.component';
import { PfCreStep01Service } from './service/pf-cre-step-01.service';

import { PfCreStep02Component } from './component/pf-cre-step-02.component';
import { PfCreStep02Service } from './service/pf-cre-step-02.service';

import { PfCreStep03Component } from './component/pf-cre-step-03.component';
import { PfCreStep03Service } from './service/pf-cre-step-03.service';

import { PfCreStep04Component } from './component/pf-cre-step-04.component';
import { PfCreStep04Service } from './service/pf-cre-step-04.service';

import { PfCreStep05Component } from './component/pf-cre-step-05.component';
import { PfCreStep05Service } from './service/pf-cre-step-05.service';

import { PfCreStep06Component } from './component/pf-cre-step-06.component';
import { PfCreStep06Service } from './service/pf-cre-step-06.service';

// Routing
import { PfConnMngRouting } from './pf-conn-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PfConnMngRouting
    ],
    declarations: [
        PaginationComponent,
        PfConnMngComponent,
        PfCreStep01Component,
        PfCreStep02Component,
        PfCreStep03Component,
        PfCreStep04Component,
        PfCreStep05Component,
        PfCreStep06Component,
    ],
    exports: [
        PfConnMngComponent,
        PfCreStep01Component,
        PfCreStep02Component,
        PfCreStep03Component,
        PfCreStep04Component,
        PfCreStep05Component,
        PfCreStep06Component,
    ],
    providers: [
        PfConnMngService,
        PfCreStep01Service,
        PfCreStep02Service,
        PfCreStep03Service,
        PfCreStep04Service,
        PfCreStep05Service,
        PfCreStep06Service
    ]

})
export class PfConnMngCreModule { }
