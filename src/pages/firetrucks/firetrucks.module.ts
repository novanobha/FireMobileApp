import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiretrucksPage } from './firetrucks';

@NgModule({
  declarations: [
    FiretrucksPage,
  ],
  imports: [
    IonicPageModule.forChild(FiretrucksPage),
  ],
})
export class FiretrucksPageModule {}
