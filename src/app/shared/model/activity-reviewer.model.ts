/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Activity reviewer model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-11-13 09:18:48
 */


import { ReviewLockTypeEnum } from "../enum/review-lock-type.enum";
import { ActivityModel } from "./activity.model";
import { ProjectModel } from "./project.model";

export interface ActivityReviewerModel extends ProjectModel, ActivityModel {
    activityReviewId ?: string;
    reviewerUserId ?: string;
    reviewerUserFirstName ?: string;
    reviewerUserLastName ?: string;
    achievedResultValue ?: number;
    reviewerComment?: string;
    reviewLock?: ReviewLockTypeEnum;
    operationType ?: string;
}