import { UserProfileModule } from './../../component/user-profile/user-profile.component.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";
import { NoDataModule } from 'src/app/component/no-data/no-data.component.module';

const routes: Routes = [
	{
		path: "",
		redirectTo: "members",
		// pathMatch: "full"
	},
	{
		path: "",
		component: MenuPage,
		children: [
			{
				path: 'no-access',
				loadChildren: () => import('../no-access/no-access.module').then( m => m.NoAccessPageModule)
			},
			{
				path: 'members',
				loadChildren: () => import('../project-members/project-members.module').then(m => m.ProjectMembersPageModule)
			},
			{
				path: 'sprints',
				loadChildren: () => import('../project-sprint/project-sprint.module').then(m => m.ProjectSprintPageModule)
			},
			{
				path: 'goals',
				loadChildren: () => import('../project-goal/project-goal.module').then(m => m.ProjectGoalPageModule)
			},
			
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		UserProfileModule,
		NoDataModule,
		RouterModule.forChild(routes)
	],
	declarations: [MenuPage]
})
export class MenuPageModule { }
