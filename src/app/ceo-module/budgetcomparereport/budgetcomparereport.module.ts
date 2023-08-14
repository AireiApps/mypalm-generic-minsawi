import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetcomparereportPageRoutingModule } from './budgetcomparereport-routing.module';

import { BudgetcomparereportPage } from './budgetcomparereport.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BudgetcomparereportPageRoutingModule
  ],
  declarations: [BudgetcomparereportPage]
})
export class BudgetcomparereportPageModule {}
