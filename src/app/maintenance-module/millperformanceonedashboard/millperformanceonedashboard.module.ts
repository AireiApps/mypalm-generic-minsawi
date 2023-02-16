import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MillperformanceonedashboardPageRoutingModule } from './millperformanceonedashboard-routing.module';

import { MillperformanceonedashboardPage } from './millperformanceonedashboard.page';

import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    IonicModule,
    MillperformanceonedashboardPageRoutingModule
  ],
  declarations: [MillperformanceonedashboardPage]
})
export class MillperformanceonedashboardPageModule {}
