import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { UserStoryModel } from './user-story.model';
import { TaskTypeModel } from './task-type.model';
import { SprintModel } from './sprint.model';
import { TaskReviewModelBaseModel } from './task-review.model';

export interface TaskModel extends UserModel, ProjectModel, UserStoryModel, TaskTypeModel, SprintModel{
  taskId ?: string;
  assigneeUserId ?: string;
  reviewers ?: UserModel[];
  taskName ?: string;
  assigneeComment ?: string;
  taskKeyCompletionIndicator ?: string;
  taskAchievedFact ?: number;
  taskReviewers ?: TaskReviewModelBaseModel;
  weightedPerformancesMean ?:number;
  operationType ?: string;
}

export interface TaskModelBaseModel {
  success ?: boolean;
  data ?: TaskModel[];
}