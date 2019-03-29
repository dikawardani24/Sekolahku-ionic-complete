import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiswaListPage } from './siswa-list';

@NgModule({
  declarations: [
    SiswaListPage,
  ],
  imports: [
    IonicPageModule.forChild(SiswaListPage),
  ],
})
export class SiswaListPageModule {}
