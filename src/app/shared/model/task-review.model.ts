import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { UserStoryModel } from './user-story.model';
import { TaskTypeModel } from './task-type.model';
import { SprintModel } from './sprint.model';
import { TaskMeasurementCriteriaModel } from './task-measurement-criteria.model';
import { TaskModel } from './task.model';

export interface TaskReviewModel extends UserModel, ProjectModel, UserStoryModel, TaskTypeModel, SprintModel, TaskMeasurementCriteriaModel, TaskModel{
    taskReviewId ?: string;
    reviewerUserId ?: string;
    achievedResultValue ?: string;
    reviewerComment ?: string;
    weightedPerformancesPercentage  ?: string;
    operationType ?: string;
  }
  
  export interface TaskReviewModelBaseModel {
    success ?: boolean;
    data ?: TaskReviewModel[];
  } 