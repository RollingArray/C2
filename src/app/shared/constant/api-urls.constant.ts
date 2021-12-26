/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Api urls
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-15 21:34:14 
 * Last modified  : 2021-12-26 21:24:48
 */

import { environment } from "../../../environments/environment";

export class ApiUrls {
	public static readonly API_ENDPOINT: string = environment.apiEndpoint;
	public static readonly API_VERSION: string = "v1";
	public static readonly API_BASE_PATH: string = ApiUrls.API_ENDPOINT + ApiUrls.API_VERSION;

	// urls
	public static readonly SIGN_IN: string = ApiUrls.API_BASE_PATH + "/user/sign/in/";
	public static readonly SIGN_UP: string = ApiUrls.API_BASE_PATH + "/user/sign/up/";
	public static readonly USER_ACTIVATE: string = ApiUrls.API_BASE_PATH + "/user/activate/";
	public static readonly USER_ACTIVATE_CODE_RESEND: string = ApiUrls.API_BASE_PATH + "/user/activate/code/resend/";
	public static readonly USER_PASSWORD_RESET_CODE: string = ApiUrls.API_BASE_PATH + "/user/password/reset/code/";
	public static readonly USER_PASSWORD_UPDATE: string = ApiUrls.API_BASE_PATH + "/user/update/password/";
	public static readonly USER_PROFILE_UPDATE: string = ApiUrls.API_BASE_PATH + "/user/profile/update/";
	public static readonly USER_DEVICE_REGISTER: string = ApiUrls.API_BASE_PATH + "/user/device/register/";
	public static readonly USER_SEARCH: string = ApiUrls.API_BASE_PATH + "/user/search/";

	public static readonly USER_DETAILS: string = ApiUrls.API_BASE_PATH + "/user/details/";
	public static readonly USER_PROJECT: string = ApiUrls.API_BASE_PATH + "/user/projects/";
	public static readonly USER_PROJECT_CRUD: string = ApiUrls.API_BASE_PATH + "/user/project/crud/";
	public static readonly PROJECT_DETAILS: string = ApiUrls.API_BASE_PATH + "/project/details/";
	public static readonly PROJECT_RAW: string = ApiUrls.API_BASE_PATH + "/project/raw/";

	public static readonly PROJECT_MEMBERS: string = ApiUrls.API_BASE_PATH + "/project/members/";
	public static readonly CREDIBILITY_INDEX: string = ApiUrls.API_BASE_PATH + "/project/credibility/index/";
	public static readonly CREDIBILITY_INDEX_DETAILS: string = ApiUrls.API_BASE_PATH + "/assignee/credibility/index/details/";
	
	public static readonly SEARCH_PROJECT: string = ApiUrls.API_BASE_PATH + "/search/project/";
	public static readonly PROJECT_MEMBER_CRUD: string = ApiUrls.API_BASE_PATH + "/project/member/crud/";


	public static readonly PROJECT_SPRINTS: string = ApiUrls.API_BASE_PATH + "/project/sprints/";
	public static readonly PROJECT_SPRINT_CRUD: string = ApiUrls.API_BASE_PATH + "/project/sprint/crud/";

	public static readonly PROJECT_GOALS: string = ApiUrls.API_BASE_PATH + "/project/goals/";
	public static readonly PROJECT_GOAL_CRUD: string = ApiUrls.API_BASE_PATH + "/project/goal/crud/";

	public static readonly PROJECT_ACTIVITIES: string = ApiUrls.API_BASE_PATH + "/goal/activities/";
	public static readonly PROJECT_MY_ACTIVITIES: string = ApiUrls.API_BASE_PATH + "/project/my/activities/";
	public static readonly PROJECT_MY_REVIEWS: string = ApiUrls.API_BASE_PATH + "/project/my/reviews/";
	public static readonly PROJECT_ACTIVITY_DETAILS: string = ApiUrls.API_BASE_PATH + "/activity/details/";
	public static readonly PROJECT_ACTIVITY_CRUD: string = ApiUrls.API_BASE_PATH + "/goal/activity/crud/";
	public static readonly PROJECT_ACTIVITY_UNLOCK: string = ApiUrls.API_BASE_PATH + "/activity/unlock/";
	public static readonly PROJECT_ACTIVITY_LOCK: string = ApiUrls.API_BASE_PATH + "/activity/lock/";

	public static readonly PROJECT_COMMENT_CRUD: string = ApiUrls.API_BASE_PATH + "/activity/comment/crud/";

	public static readonly PROJECT_ACTIVITY_REVIEWER_CRUD: string = ApiUrls.API_BASE_PATH + "/activity/reviewer/crud/";
	public static readonly PROJECT_ACTIVITY_REVIEW_UPDATE: string = ApiUrls.API_BASE_PATH + "/review/update/";
	public static readonly PROJECT_ACTIVITY_REVIEW_UNLOCK: string = ApiUrls.API_BASE_PATH + "/review/unlock/";
	public static readonly PROJECT_ACTIVITY_REVIEW_LOCK: string = ApiUrls.API_BASE_PATH + "/review/lock/";


	public static readonly GITHUB: string = "https://github.com/RollingArray/C2-storyline";
	public static readonly RA: string = 'https://rollingarray.co.in/';
	public static readonly HELP_BASE: string = 'https://c2.doc.rollingarray.co.in/';
	public static readonly HELP_BASE_ARTICLE: string = 'https://c2.doc.rollingarray.co.in/#/go/articles/';
	public static readonly HELP: string = ApiUrls.HELP_BASE;
	public static readonly HELP_PP: string = ApiUrls.HELP_BASE_ARTICLE + "privacy-policy";
	public static readonly HELP_T_C: string = ApiUrls.HELP_BASE_ARTICLE + "terms-conditions";
	public static readonly HELP_AUTH: string = ApiUrls.HELP_BASE_ARTICLE + "authentication-&-authorization";
	public static readonly HELP_SIGN_UP: string = ApiUrls.HELP_BASE_ARTICLE + "sign-up";
	public static readonly HELP_SIGN_IN: string = ApiUrls.HELP_BASE_ARTICLE + "sign-in";
	public static readonly HELP_PROFILE: string = ApiUrls.HELP_BASE_ARTICLE + "my-profile";
	public static readonly HELP_MY_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "my-projects";
	public static readonly HELP_NEW_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "create-new-project";
	public static readonly HELP_EDIT_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "edit-existing-project-details";

	public static readonly HELP_PROJECT: string = ApiUrls.HELP_BASE_ARTICLE + "projects";
	public static readonly HELP_MEMBERS: string = ApiUrls.HELP_BASE_ARTICLE + "project-team";
	public static readonly HELP_SPRINT: string = ApiUrls.HELP_BASE_ARTICLE + "sprint";
	public static readonly HELP_GOAL: string = ApiUrls.HELP_BASE_ARTICLE + "goal";
	public static readonly HELP_ACTIVITY: string = ApiUrls.HELP_BASE_ARTICLE + "activity";
	public static readonly HELP_MEASUREMENT: string = ApiUrls.HELP_BASE_ARTICLE + "measurement-criteria";
	public static readonly HELP_CHARACTER: string = ApiUrls.HELP_BASE_ARTICLE + "measurement-criteria-characteristics";
	public static readonly HELP_REVIEWER: string = ApiUrls.HELP_BASE_ARTICLE + "reviewer";
	public static readonly HELP_FEEDBACK: string = ApiUrls.HELP_BASE_ARTICLE + "feedback-classification-&-calculating-performance";
	public static readonly HELP_WEIGHTED_PERFORMANCE: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-weighted-performances";
	public static readonly HELP_ACTIVITY_PERFORMANCE: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-activity-performance";
	public static readonly HELP_CREDIBILITY: string = ApiUrls.HELP_BASE_ARTICLE + "calculating-credibility";
	public static readonly HELP_OPPORTUNITY: string = ApiUrls.HELP_BASE_ARTICLE + "define-equal-opportunities";

}
