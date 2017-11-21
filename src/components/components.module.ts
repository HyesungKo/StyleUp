import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileFormComponent } from './profile-form/profile-form';
import { EditProfileFormWithExistingProfileComponent } from './edit-profile-form-with-existing-profile/edit-profile-form-with-existing-profile';

@NgModule({
	declarations: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileFormComponent,
    EditProfileFormWithExistingProfileComponent],
	imports: [IonicModule],
	exports: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileFormComponent,
    EditProfileFormWithExistingProfileComponent]
})
export class ComponentsModule {}
