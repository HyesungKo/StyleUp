import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileFormComponent } from './profile-form/profile-form';
import { BoutiqueRegisterFormComponent } from './boutique-register-form/boutique-register-form';

@NgModule({
	declarations: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileFormComponent,
    BoutiqueRegisterFormComponent],
	imports: [IonicModule],
	exports: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileFormComponent,
    BoutiqueRegisterFormComponent]
})
export class ComponentsModule {}
