import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoutiqueRegisterPage } from './boutique-register';

@NgModule({
  declarations: [
    BoutiqueRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(BoutiqueRegisterPage),
    ComponentsModule
  ],
})
export class BoutiqueRegisterPageModule {}
