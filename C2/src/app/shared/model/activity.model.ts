/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Activity Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-05-08 18:13:46
 */


import { ActivityMeasurementTypeEnum } from "../enum/activity-measurement-type.enum";
import { ActivityReviewerBaseModel } from "./activity-reviewer-base.model";
import { ProjectModel } from "./project.model";

export interface ActivityModel extends ProjectModel {

    activityId ?: string;
    sprintId ?: string;
    sprintName ?: string;
    goalId ?: string;
    assigneeUserId ?: string;
    assigneeUserFirstName ?: string;
    assigneeUserLastName ?: string;
    activityName ?: string;
    activityWeight ?: number;
    activityWeightDelta ?: number;
    activityMeasurementType ?: ActivityMeasurementTypeEnum;
    activityResultType ?: string;
    criteriaPoorValue ?: number;
    criteriaImprovementValue ?: number;
    criteriaExpectationValue ?: number;
    criteriaExceedValue ?: number;
    criteriaOutstandingValue ?: number;
    characteristicsHigherBetter ?: number;
    commentId ?: string;
    commentDescription ?: string;
    claimedResultValue ?: number;
    activityLocked ?: Boolean;
    activityReviewers ?: ActivityReviewerBaseModel
    operationType ?: string;
}