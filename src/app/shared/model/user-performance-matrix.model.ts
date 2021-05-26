/**
 * @author Ranjoy Sen
 */

import { ProjectModel } from './project.model';
import { SprintModel } from './sprint.model';
import { UserModel } from './user.model';
import { UserStoryModel } from './user-story.model';
import { TaskMeasurementCriteriaModel } from './task-measurement-criteria.model';
import { TaskTypeModel } from './task-type.model';

export interface UserPerformanceMatrixModel extends ProjectModel, SprintModel, UserModel, UserStoryModel, TaskTypeModel {
    matrixUserId ?: string;
    userPerformanceMatrixId ?: string;
    weight ?: string;
    userstoryMeasurementCriterias ? : UserstoryMeasurementCriteriasModel;
    operationType ?: string;
}

export interface UserstoryMeasurementCriteriasModel {
    success ?: boolean;
    data ?: TaskMeasurementCriteriaModel[]  
}
