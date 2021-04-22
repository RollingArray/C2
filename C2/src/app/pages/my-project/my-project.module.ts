import { PanelHeaderModule } from './../../component/panel-header/panel-header.component.module';
import { PageInfoTitleModule } from './../../component/page-info-title/page-info-title.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { NoDataModule } from './../../component/no-data/no-data.component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyProjectPage } from './my-project.page';
import { CreateEditProjectModule } from './../../component/create-edit-project/create-edit-project.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';

const routes: Routes = [
  {
    path: '',
    component: MyProjectPage
  },
  {
		path: ":projectId/go",
		loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule),
	}
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CreateEditProjectModule,
    NoDataModule,
    PageInfoTitleModule,
    PanelHeaderModule,
    PanelInfoModule,
    CustomFieldsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyProjectPage]
})
export class MyProjectPageModule {}
