/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Project activity Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2021-05-08 18:27:33
 */

import { ActivityReviewerBaseModel } from './activity-reviewer-base.model';
import { ActivityModel } from './activity.model';
import { ProjectActivityBaseModel } from './project-activity-base.model';
import { ProjectModel } from './project.model';

export interface ProjectActivityModel {
    projectDetails ?: ProjectModel;
    filter ?:boolean;
    projectActivities ?: ProjectActivityBaseModel;
    activityDetails ?: ActivityModel;
    reviewDetails ?: ActivityReviewerBaseModel
}