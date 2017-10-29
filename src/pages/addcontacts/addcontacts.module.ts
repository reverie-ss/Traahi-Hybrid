import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcontactsPage } from './addcontacts';

@NgModule({
  declarations: [
    AddcontactsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcontactsPage),
  ],
})
export class AddcontactsPageModule {}
