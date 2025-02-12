import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractInboxComponent } from './contract-inbox/contract-inbox.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ContractAlertComponent } from './contract-alert/contract-alert.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BedrockPromptComponent } from './bedrock-prompt/bedrock-prompt.component';
import { FilterPipe } from "./pipe/filter.pipe";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContractInboxComponent,
        ContractAlertComponent,
        DashboardComponent,
        BedrockPromptComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    FilterPipe
], 
    providers: [provideHttpClient(withInterceptorsFromDi())]
 })
export class AppModule { }
