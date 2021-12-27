import { UserTypeEnum } from "../enum/user-type.enum";

export interface RouteModel
{
	title: string;
	children: RouteChildrenModel[];
}

export interface RouteChildrenModel
{
	title: string;
	root?: boolean;
	url: string[];
	icon: string;
	allowAccess?: UserTypeEnum[];
	allowMenuAccess?: boolean;
}