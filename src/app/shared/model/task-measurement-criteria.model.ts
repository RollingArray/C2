/**
 * @author Ranjoy Sen
 */

import { ProjectModel } from './project.model';
import { SprintModel } from './sprint.model';
import { TaskTypeModel } from './task-type.model';
import { UserStoryModel } from './user-story.model';
import { TaskModelBaseModel } from './task.model';

export interface TaskMeasurementCriteriaModel extends ProjectModel, SprintModel, TaskTypeModel, UserStoryModel  {
    taskTypeMeasurementCriteriaId ?: string;
    measurementPurpose ?: string;
    taskTypeMeasurementType ?: string;
    achievedResultValue ?: string;
    criteriaPoorValue ?: string;
    criteriaImprovementValue ?: string;
    criteriaExpectationValue ?: string;
    criteriaExceedValue ?: string;
    criteriaOutstandingValue ?: string;
    characteristicsHigherBetter ? : number;
    userTasks ? : TaskModelBaseModel;
    operationType ?: string;
}
