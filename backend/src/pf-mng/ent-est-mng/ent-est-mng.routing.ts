import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntEstMngComponent } from './component/ent-est-mng.component';
import { EntEstCreStep01Component } from './component/ent-est-cre-step-01.component';
import { EntEstCreStep02Component } from './component/ent-est-cre-step-02.component';
import { EntEstCreStep03Component } from './component/ent-est-cre-step-03.component';

export const EntEstMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf-mng/ent-est-mng/ent-est-mng',
        component: EntEstMngComponent
    }
    ,{
    	path: 'pf-mng/ent-est-mng/ent-est-cre-step-01',
    	component: EntEstCreStep01Component
    }
    ,{
    	path: 'pf-mng/ent-est-mng/ent-est-cre-step-02'
    	,component: EntEstCreStep02Component
    }
    ,{
    	path: 'pf-mng/ent-est-mng/ent-est-cre-step-03'
    	,component: EntEstCreStep03Component
    }
]);