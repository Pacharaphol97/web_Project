import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Service
import { AuthService } from './services/auth/auth.service';

// Guard
import { AuthGuard } from './guards/auth/auth.guard';
import { PermissionGuard } from './guards/permission/permission.guard'

// Component
import { NavbarComponent } from './navbar/navbar.component'
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component'
import { PersonnelComponent } from './personnel/personnel/personnel.component'
import { AddpersonnelComponent } from './personnel/addpersonnel/addpersonnel.component'
import { EditpersonnelComponent } from './personnel/editpersonnel/editpersonnel.component'
import { TimestampComponent } from './timestamp/timestamp/timestamp.component'
import { LeaveComponent } from './leave/leave/leave.component'


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'personnel',component:PersonnelComponent,canActivate:[AuthGuard]},
  {path:'createpersonnel',component:AddpersonnelComponent,canActivate:[AuthGuard]},
  {path:'editpersonnel',component:EditpersonnelComponent,canActivate:[AuthGuard]},
  {path:'timestamp',component:TimestampComponent,canActivate:[AuthGuard]},
  {path:'leave',component:LeaveComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    HomeComponent,
    PersonnelComponent,
    AddpersonnelComponent,
    EditpersonnelComponent,
    TimestampComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [AngularFireDatabase ,AuthService,AuthGuard,PermissionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
