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
  public static readonly PROJECT_MEMBERS: string = ApiUrls.API_BASE_PATH + "/project/members/";
  public static readonly SEARCH_PROJECT: string = ApiUrls.API_BASE_PATH + "/search/project/";
  public static readonly PROJECT_MEMBER_CRUD: string = ApiUrls.API_BASE_PATH + "/project/member/crud/";
  

  public static readonly PROJECT_SPRINTS: string = ApiUrls.API_BASE_PATH + "/project/sprints/";
  public static readonly PROJECT_SPRINT_CRUD: string = ApiUrls.API_BASE_PATH + "/project/sprint/crud/";
  
  public static readonly PROJECT_GOALS: string = ApiUrls.API_BASE_PATH + "/project/goals/";
  public static readonly PROJECT_GOAL_CRUD: string = ApiUrls.API_BASE_PATH + "/project/goal/crud/";
  
  public static readonly PROJECT_TASK_TYPES: string = ApiUrls.API_BASE_PATH + "/project/task/types/";
  public static readonly PROJECT_TASK_TYPE_CRUD: string = ApiUrls.API_BASE_PATH + "/project/task/type/crud/";
  public static readonly PROJECT_USER_STORY: string = ApiUrls.API_BASE_PATH + "/project/userstory/";
  public static readonly PROJECT_USER_STORY_CRUD: string = ApiUrls.API_BASE_PATH + "/project/userstory/crud/";

  public static readonly PROJECT_TASK_MEASUREMENT_CRITERIA: string = ApiUrls.API_BASE_PATH + "/project/task/type/measurement/criteria/";
  public static readonly PROJECT_TASK_MEASUREMENT_CRITERIA_CRUD: string = ApiUrls.API_BASE_PATH + "/project/task/type/measurement/criteria/crud/";
  public static readonly PROJECT_RAW: string = ApiUrls.API_BASE_PATH + "/project/raw/";

  public static readonly PROJECT_USER_PERFORMANCE_MATRIX: string = ApiUrls.API_BASE_PATH + "/project/user/performance/matrix/";
  public static readonly PROJECT_USER_PERFORMANCE_MATRIX_CRUD: string = ApiUrls.API_BASE_PATH + "/project/user/performance/matrix/crud/";

  public static readonly PROJECT_USER_TASK: string = ApiUrls.API_BASE_PATH + "/project/user/task/";
  public static readonly PROJECT_USER_TASK_CRUD: string = ApiUrls.API_BASE_PATH + "/project/user/task/crud/";
  public static readonly PROJECT_USER_TASK_REVIEW_CRUD: string = ApiUrls.API_BASE_PATH + "/project/user/task/review/crud/";
  public static readonly PROJECT_USER_TASK_SELF_ASSESSMENT: string = ApiUrls.API_BASE_PATH + "/project/user/task/self/assessment/";

}
