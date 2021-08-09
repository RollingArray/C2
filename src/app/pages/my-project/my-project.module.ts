/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary My project page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:10:17 
 * Last modified  : 2021-08-06 20:01:53
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'src/app/component/avatar/avatar.component.module';
import { CreateEditProjectModule } from 'src/app/component/create-edit-project/create-edit-project.module';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';
import { NextStepModule } from 'src/app/component/next-step/next-step.component.module';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { ToolTipModule } from 'src/app/component/tool-tip/tool-tip.module';
import { UserProfileModule } from 'src/app/component/user-profile/user-profile.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CommonCrudService } from 'src/app/shared/service/common-crud.service';
import { MyProjectPage } from './my-project.page';

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
    AvatarModule,
    NextStepModule,
    ToolTipModule,
    UserProfileModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    CommonCrudService
  ],
  declarations: [MyProjectPage]
})
export class MyProjectPageModule {}
