/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Global array key
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-05-18 19:15:29 
 * Last modified  : 2021-11-22 19:58:24
 */


import { StringKey } from 'src/app/shared/constant/string.constant';
import { UserTypeEnum } from '../enum/user-type.enum';
import { RouteModel } from '../model/route.model';
import { SlideModel } from '../model/slide.model';

export class ArrayKey {
	/**
	 * App primary route pages of array key
	 */
	public static readonly APP_PRIMARY_ROUTE_PAGES: RouteModel[] = [
		{
			title: StringKey.CREDIBILITY,
			children: [
				{
					title: StringKey.CREDIBILITY_BOARD,
					url: ['credibility-board'],
					icon: StringKey.ICON_CREDIBILITY,
					allowAccess: [UserTypeEnum.Administrator]
				},
			]
		},
		{
			title: StringKey.MY_SPACE,
			children: [
				{
					title: StringKey.MY_ACTIVITY,
					url: ['my','activity'],
					icon: StringKey.ICON_MY_ACTIVITY,
					allowAccess: [UserTypeEnum.Administrator, UserTypeEnum.Assignee, UserTypeEnum.Reviewer]
				},
				{
					title: StringKey.MY_REVIEW,
					url: ['my','review'],
					icon: StringKey.ICON_MY_REVIEWS,
					allowAccess: [UserTypeEnum.Administrator, UserTypeEnum.Reviewer, UserTypeEnum.Assignee]
				},
			]
		},
		{
			title: StringKey.SELECTED_PROJECT_SETTINGS,
			children: [
				{
					title: StringKey.PROJECT_TEAM,
					url: ['members'],
					icon: StringKey.ICON_MEMBERS,
					allowAccess: [UserTypeEnum.Administrator, UserTypeEnum.Assignee, UserTypeEnum.Reviewer]
				},
				{
					title: StringKey.PROJECT_SPRINT,
					url: ['sprints'],
					icon: StringKey.ICON_SPRINT,
					allowAccess: [UserTypeEnum.Administrator]
				},
				{
					title: StringKey.PROJECT_GOAL,
					url: ['goals'],
					icon: StringKey.ICON_GOAL,
					allowAccess: [UserTypeEnum.Administrator]
				},
				{
					title: StringKey.PROJECT_ACTIVITY,
					url: ['activities'],
					icon: StringKey.ICON_ACTIVITY,
					allowAccess: [UserTypeEnum.Administrator]
				},
			]
		},
	];


	/**
	 * Intro slide array of array key
	 */
	public static readonly INTRO_SLIDE_ARRAY: SlideModel[] = [
		{
			title: StringKey.INTRO_SLIDE_0_TITLE,
			info: StringKey.INTRO_SLIDE_0_INFO,
			imageName: "inclusion",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_1_TITLE,
			info: StringKey.INTRO_SLIDE_1_INFO,
			imageName: "no_project",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_2_TITLE,
			info: StringKey.INTRO_SLIDE_2_INFO,
			imageName: "no_member",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_3_TITLE,
			info: StringKey.INTRO_SLIDE_3_INFO,
			imageName: "no_sprint",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_4_TITLE,
			info: StringKey.INTRO_SLIDE_4_INFO,
			imageName: "no_goal",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_5_TITLE,
			info: StringKey.INTRO_SLIDE_5_INFO,
			imageName: "no_activity",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_6_TITLE,
			info: StringKey.INTRO_SLIDE_6_INFO,
			imageName: "no_reviewer",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_7_TITLE,
			info: StringKey.INTRO_SLIDE_7_INFO,
			imageName: "no_diversity",
			buttonText: StringKey.SKIP_INTRO,
		},
		{
			title: StringKey.INTRO_SLIDE_8_TITLE,
			info: StringKey.INTRO_SLIDE_8_INFO,
			imageName: "no_credibility",
			buttonText: StringKey.GOT_IT_CONTINUE,
		},
	];
	
	/**
	 * Next step of array key
	 */
	public static readonly NEXT_STEP = {
		crudProject: {
			image: StringKey.IMAGE_PROJECT_DONE,
			steps: [
				{
					title: StringKey.NS_PROJECT_1,
					url: ['members'],
					icon: StringKey.ICON_MEMBERS
				},
				{
					title: StringKey.NS_PROJECT_2,
					url: ['members'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_PROJECT_3,
					url: ['goals'],
					icon: StringKey.ICON_GOAL
				},
				{
					title: StringKey.NS_PROJECT_4,
					url: ['sprints'],
					icon: StringKey.ICON_SPRINT
				},
				{
					title: StringKey.NS_PROJECT_5,
					url: ['activities'],
					icon: StringKey.ICON_ACTIVITY
				},
				{
					title: StringKey.NS_PROJECT_6,
					url: ['credibility-board'],
					icon: StringKey.ICON_CREDIBILITY
				},
			]
		},
		crudProjectAssignee: {
			image: StringKey.IMAGE_PROJECT_DONE,
			steps: [
				{
					title: StringKey.NS_PROJECT_7,
					url: ['my','activity'],
					icon: StringKey.ICON_MY_ACTIVITY
				}
			]
		},
		crudProjectReviewer: {
			image: StringKey.IMAGE_PROJECT_DONE,
			steps: [
				{
					title: StringKey.NS_PROJECT_8,
					url: ['my','review'],
					icon: StringKey.ICON_MY_REVIEWS
				}
			]
		},
		crudGoal: {
			image: StringKey.IMAGE_GOAL_DONE,
			steps: [
				
				{
					title: StringKey.NS_GOAL_1,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_GOAL_2,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_GOAL_3,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_GOAL_4,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
			]
		},
		crudSprint: {
			image: StringKey.IMAGE_SPRINT_DONE,
			steps: [
				{
					title: StringKey.NS_SPRINT_1,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_SPRINT_2,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_SPRINT_3,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
				{
					title: StringKey.NS_SPRINT_4,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
			]
		},
		openActivityAssignee: {
			image: StringKey.IMAGE_MEMBER_DONE,
			steps: [
				{
					title: StringKey.NS_ACTIVITY_ASSIGNEE_1,
					url: ['activities'],
					icon: StringKey.ICON_ASSIGNEE
				},
			]
		},
		openActivityReview: {
			image: StringKey.IMAGE_REVIEWER_DONE,
			steps: [
				{
					title: StringKey.NS_ACTIVITY_REVIEWER_1,
					url: ['activities'],
					icon: StringKey.ICON_REVIEWER
				},
			]
		}
	}
}