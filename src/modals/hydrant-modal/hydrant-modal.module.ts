import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HydrantModalPage } from './hydrant-modal';

@NgModule({
  declarations: [
    HydrantModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HydrantModalPage),
  ],
})
export class HydrantModalPageModule {}
