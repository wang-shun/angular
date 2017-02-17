import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SpinnerComponent } from './spinner/component/spinner.component';
import { PaginationComponent } from './pagination/component/pagination.component';
import { NoticeComponent } from './dialog/component/notice.component';
import { ConfirmComponent } from './dialog/component/confirm.component';
import { PopupComponent } from './dialog/component/popup.component';
import { CountBarComponent } from './countBar/component/count-bar.component';
import { BillingInfoComponent } from './billingInfo/billingInfo.component';
import { BillingInfoService } from './billingInfo/billingInfo.service';
import { TableEditNameComponent } from './tableEditName/component/tableEditName.component';
import { PopoverModule } from './popover/index';
import { MyDatePickerModule } from './date-picker/my-date-picker.module';

import { ClickOutsideModule } from 'ng2-click-outside';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate';
import { DialogTranslate } from './dialog/service/dialog-translate.service';


// import { DonutChart } from './donutChart/component/chart.component';
// import { LineChart } from './lineChart/component/chart.component';

// import { OrderByPipe } from '../pipe/orderby';

@NgModule({
    imports: [
        CommonModule,
        Ng2Bs3ModalModule,
        FormsModule,
        ClickOutsideModule,
        HttpModule,
        TranslateModule.forRoot()
        // ChartsModule
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        BillingInfoComponent,
        TableEditNameComponent
        // OrderByPipe
        // DonutChart,
        // LineChart
    ],
    exports: [
        CommonModule,
        MyDatePickerModule,
        FormsModule,
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        BillingInfoComponent,
        ClickOutsideModule,
        PopoverModule,
        ChartsModule,
        TableEditNameComponent,
        HttpModule,
        TranslateModule
        // OrderByPipe
        // DonutChart,
        // LineChart
    ],
    providers : [
        DialogTranslate,
        BillingInfoService
    ]
})
export class CommonComponentModule { }
