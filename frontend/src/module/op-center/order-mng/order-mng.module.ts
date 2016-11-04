﻿import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent, OrderMngComponent,OrderMngRenewComponent,OrderMngCancelComponent} from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        OrderMngRouting
    ],
    declarations: [
        OrderMngDetailComponent,
        OrderMngComponent,
        OrderMngRenewComponent,
        OrderMngCancelComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }