import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2';

import { ParameteriseComponent } from './parameterise/parameterise.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { UseModelComponent } from './use-model/use-model.component'
import { DatabaseManagementComponent } from './database-management/database-management.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { DicomComponent } from './dicom/dicom.component';
import { FurtherDetailsComponent } from './further-details/further-details.component'


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'details',
    component: FurtherDetailsComponent
  },
  {
    path: 'storage',
    redirectTo: 'database'
  },
  {
    path: 'database',
    component: DatabaseManagementComponent
  },
  {
    path: 'specifications',
    component: SpecificationsComponent
  },
  {
    path: 'dicom',
    component: DicomComponent
  },
  {
    path: 'parameterise',
    component: ParameteriseComponent
  },
  {
    path: 'create-model',
    component: CreateModelComponent
  },
  {
    path: 'use-model',
    component: UseModelComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'model',
    redirectTo: 'create-model'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [
  //Angulartics2GoogleAnalytics
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);