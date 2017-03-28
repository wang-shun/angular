import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';

import { TranslateService } from 'ng2-translate';
import { TranslateModule } from 'ng2-translate';

import { TranslateEN } from '../translate/translateEN';
import { TranslateCN } from '../translate/translateCN';

@NgModule({
    imports: [
      HttpModule,
      CommonModule,
      TranslateModule.forRoot()
    ],
    exports: [
      CommonModule,
      TranslateModule
    ]
})
export class SharedModule {
    
     constructor(private translate: TranslateService) {
                  
        translate.setTranslation('EN',  TranslateEN);
        translate.setTranslation('CN',  TranslateCN);

        translate.addLangs(["EN", "CN"]);
        translate.setDefaultLang('CN');

        let browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/EN|CN/) ? browserLang : 'CN');
    }
}
