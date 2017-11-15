import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfileWithExistingProfilePage } from './edit-profile-with-existing-profile';

@NgModule({
  declarations: [
    EditProfileWithExistingProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfileWithExistingProfilePage),
    ComponentsModule
  ],
})
export class EditProfileWithExistingProfilePageModule {}
