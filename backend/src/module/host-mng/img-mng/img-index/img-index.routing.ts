import { RouterModule } from "@angular/router";

import { ImgIndexComponent } from './component/img-index.component';

export const ImgIndexRouting = RouterModule.forChild([
    {
        path: 'img-mng/img-index',
        component:  ImgIndexComponent 
    }
]);