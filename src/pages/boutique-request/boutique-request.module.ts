import { IonicPageModule } from 'ionic-angular';
import { BoutiqueRequestPage } from './boutique-request';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        BoutiqueRequestPage
    ],
    imports: [
        IonicPageModule.forChild(BoutiqueRequestPage)
    ]
})
export class BoutiqueRequestPageModule {}