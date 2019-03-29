import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiswaFormPage } from './siswa-form';

@NgModule({
  declarations: [
    SiswaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SiswaFormPage),
  ],
})
export class SiswaFormPageModule {}
