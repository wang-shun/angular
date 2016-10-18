import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-est-mng
import { EntEstMngComponent } from './component/ent-est-mng.component';
import { EntEstCreStep01Component } from './component/ent-est-cre-step-01.component';
import { EntEstCreStep02Component } from './component/ent-est-cre-step-02.component';
import { EntEstCreStep03Component } from './component/ent-est-cre-step-03.component';
import { EntEstCreStep04Component } from './component/ent-est-cre-step-04.component';
import { EntEstCreComponent } from './component/ent-est-cre.component';
// Routing
import { EntEstMngRouting } from './ent-est-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        EntEstMngRouting
    ],
    declarations: [
        EntEstMngComponent
        ,EntEstCreStep01Component
        ,EntEstCreStep02Component
        ,EntEstCreStep03Component
        ,EntEstCreStep04Component
        ,EntEstCreComponent
    ],
    exports: [EntEstMngComponent],
    providers: []

})
export class EntEstMngModule { }