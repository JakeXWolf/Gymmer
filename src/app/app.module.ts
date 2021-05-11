import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatFormFieldModule,
  MatInputModule, MatButtonModule,
  MatIconModule, MatListModule, MatGridListModule,
  MatCheckboxModule, MatOptionModule,
  MatSelectModule, MatSliderModule,
  MatDialogModule } from '@angular/material';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';

import { FilterService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AccordionModule,
    ButtonModule,
    CarouselModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    TableModule,

    FormsModule,

    MatCardModule,
    MatIconModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
