import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'src/app/component/avatar/avatar.component.module';
import { CreateEditProjectModule } from 'src/app/component/create-edit-project/create-edit-project.module';
import { CustomFieldsModule } from 'src/app/component/custom-fields/custom-fields-fields.component.module';
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';
import { PageInfoTitleModule } from 'src/app/component/page-info-title/page-info-title.component.module';
import { PanelHeaderModule } from 'src/app/component/panel-header/panel-header.component.module';
import { PanelInfoModule } from 'src/app/component/panel-info/panel-info.component.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
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
    RouterModule.forChild(routes)
  ],
  declarations: [MyProjectPage]
})
export class MyProjectPageModule {}
