import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { PublicidadesComponent } from './pages/publicidades/publicidades.component';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    PublicidadesComponent
  ],
    imports: [
      BrowserModule,
      AvatarModule,
      HttpClientModule,
      ReactiveFormsModule,
      AppRoutingModule,
      TableModule,
      FormsModule,
      MenuModule,
      InputTextareaModule,
      ButtonModule,
      InputTextModule,
      MultiSelectModule,
      CalendarModule,
      ToastModule,
      DialogModule,
      FileUploadModule,
      ToolbarModule,
      TagModule,
    ],
  providers: [MessageService, provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }