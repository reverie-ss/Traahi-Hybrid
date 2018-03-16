import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingInfoPage } from './booking-info';

@NgModule({
  declarations: [
    BookingInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingInfoPage),
  ],
})
export class BookingInfoPageModule {}
