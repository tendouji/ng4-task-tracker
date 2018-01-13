import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import { MyDatePickerModule } from 'mydatepicker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GlobalDataService } from './services/globaldata.services';
import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './layout/menu/menu.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ChartComponent } from './widget/chart/chart.component';
import { PopupModalComponent } from './layout/popup-modal/popup-modal.component';
import { DimmerComponent } from './layout/dimmer/dimmer.component';
import { AddTaskFormComponent } from './widget/add-task-form/add-task-form.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutComponent } from './pages/about/about.component';

const appRoutes: Routes = [
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
  }, 
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ChartComponent,
    PopupModalComponent,
    DimmerComponent,
    AddTaskFormComponent,
    PageNotFoundComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MyDatePickerModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [GlobalDataService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
