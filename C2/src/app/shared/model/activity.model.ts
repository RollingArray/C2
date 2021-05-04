/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Activity Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-05-04 11:18:20
 */


import { ActivityMeasurementTypeEnum } from "../enum/activity-measurement-type.enum";
import { ProjectModel } from "./project.model";

export interface ActivityModel extends ProjectModel {

    activityId ?: string;
    sprintId ?: string;
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
    activityAchievedFact ? : string;
    commentId ?: string;
    commentDescription ?: string;
    activityLocked ?: Boolean;
}