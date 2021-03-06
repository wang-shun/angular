import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DlrMngComponent } from './component/dlr-mng.component';
import { DlrMngSetComponent } from './component/dlr-mng-set.component';
export const DlrMngRouting : ModuleWithProviders = RouterModule.forChild([
    {
        path: 'vm-mng-nsx/dlr-mng',
        component: DlrMngComponent
    },{
        path: 'vm-mng-nsx/dlr-mng-set',
        component: DlrMngSetComponent
    }

])