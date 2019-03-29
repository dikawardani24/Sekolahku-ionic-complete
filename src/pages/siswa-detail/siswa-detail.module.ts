import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiswaDetailPage } from './siswa-detail';

@NgModule({
  declarations: [
    SiswaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SiswaDetailPage),
  ],
})
export class SiswaDetailPageModule {}
