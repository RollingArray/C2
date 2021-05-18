/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Global array key
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:15:29 
 * Last modified  : 2021-05-18 19:16:07
 */


import { StringKey } from 'src/app/shared/constant/string.constant';
import { RouteModel } from '../model/route.model';

export class ArrayKey {
	/**
	 * App primary route pages of array key
	 */
	public static readonly APP_PRIMARY_ROUTE_PAGES: RouteModel[] = [
		{
			title: StringKey.MY_SPACE,
			children: [
				{
					title: StringKey.MY_ACTIVITY,
					url: ['my','activity'],
					icon: StringKey.ICON_MY_ACTIVITY
				},
				{
					title: StringKey.MY_REVIEW,
					url: ['my','review'],
					icon: StringKey.ICON_MY_REVIEWS
				},
			]
		},
		{
			title: StringKey.SELECTED_PROJECT_SETTINGS,
			children: [
				{
					title: StringKey.PROJECT_MEMBERS,
					url: ['members'],
					icon: StringKey.ICON_MEMBERS
				},
				{
					title: StringKey.CREDIBILITY_BOARD,
					url: ['credibility-board'],
					icon: StringKey.ICON_CREDIBILITY
				},
				{
					title: StringKey.PROJECT_SPRINT,
					url: ['sprints'],
					icon: StringKey.ICON_SPRINT
				},
				{
					title: StringKey.PROJECT_GOAL,
					url: ['goals'],
					icon: StringKey.ICON_GOAL
				},
				{
					title: StringKey.PROJECT_ACTIVITY,
					url: ['activities'],
					icon: StringKey.ICON_ACTIVITY
				},
			]
		},
	];

	/**
	 * Next step of array key
	 */
	public static readonly NEXT_STEP = {
		crudProject: {
			image: StringKey.IMAGE_PROJECT_DONE,
			steps: [
				StringKey.NS_PROJECT_1,
				StringKey.NS_PROJECT_2,
				StringKey.NS_PROJECT_3,
				StringKey.NS_PROJECT_4,
				StringKey.NS_PROJECT_5,
				StringKey.NS_PROJECT_6,
			]
		}
	}
}