/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Menu page module
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-01 20:47:46 
 * Last modified  : 2021-11-01 20:48:31
 */

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
				path: 'my/:spaceType',
				loadChildren: () => import('../my-space/my-space.module').then(m => m.MySpacePageModule)
			},
			{
				path: 'no-access',
				loadChildren: () => import('../no-access/no-access.module').then( m => m.NoAccessPageModule)
			},
			{
				path: 'credibility-board',
				loadChildren: () => import('../credibility-board/credibility-board.module').then(m => m.CredibilityBoardPageModule)
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
			{
				path: 'activities',
				loadChildren: () => import('../project-activity/project-activity.module').then( m => m.ProjectActivityPageModule)
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
