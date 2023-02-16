import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationHistoryscreenPageRoutingModule } from './notification-historyscreen-routing.module';

import { NotificationHistoryscreenPage } from './notification-historyscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    IonicModule,
    NotificationHistoryscreenPageRoutingModule
  ],
  declarations: [NotificationHistoryscreenPage]
})
export class NotificationHistoryscreenPageModule {}
