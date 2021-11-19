import { AuthGuard } from "./shared/guard/auth.guard";
import { NgModule } from "@angular/core";
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		redirectTo: "front",
		pathMatch: "full",
	},
	{
		path: "sign-in",
		loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
	},
	{
		path: "sign-up",
		loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
	},
	{
		path: "front",
		loadChildren: () => import('./pages/front/front.module').then( m => m.FrontPageModule)
	},
	{ 	
		path: 'my-project', 
		loadChildren: () => import('./pages/my-project/my-project.module').then( m => m.MyProjectPageModule),
		canActivate: [AuthGuard],
	},
	{
		path: "go",
		loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
		canActivate: [AuthGuard],
	},
];

export const routingConfiguration: ExtraOptions = {
	paramsInheritanceStrategy: 'always',
	preloadingStrategy: PreloadAllModules
  };

@NgModule({
	imports: [
		RouterModule.forRoot(routes, routingConfiguration),
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }
