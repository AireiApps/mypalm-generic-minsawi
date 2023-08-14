import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteapprovalPageRoutingModule } from './quoteapproval-routing.module';

import { QuoteapprovalPage } from './quoteapproval.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QuoteapprovalPageRoutingModule
  ],
  declarations: [QuoteapprovalPage]
})
export class QuoteapprovalPageModule {}
