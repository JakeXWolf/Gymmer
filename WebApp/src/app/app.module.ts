import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatFormFieldModule,
  MatInputModule, MatButtonModule,
  MatIconModule, MatListModule, MatGridListModule,
  MatCheckboxModule, MatOptionModule,
  MatSelectModule, MatSliderModule,
  MatDialogModule, MatToolbarModule } from '@angular/material';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';

import { FilterService } from 'primeng/api';
import { ExerciseService } from './core/services/Exercise.service';

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
    InputSwitchModule,
    TableModule,

    FormsModule,
    HttpClientModule,

    MatCardModule,
    MatIconModule,
    MatToolbarModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    FilterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
