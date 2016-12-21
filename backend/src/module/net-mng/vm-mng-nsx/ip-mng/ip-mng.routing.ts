import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpMngListComponent } from './component/ip-mng-list.component';
import { IpUsageMngListComponent } from './component/ipusage-mng-list.component';

export const IpMngRouting = RouterModule.forChild([
    {
        path: 'net-mng/vm-mng-nsx/ip-mng-list',
        component: IpMngListComponent
    },
    {
        path : 'net-mng/vm-mng-nsx/ipusage-mng-list',
        component : IpUsageMngListComponent
    }
]);
