import { ProjectGoalBaseModel } from './project-goal-base.model';
import { ProjectModel } from './project.model';

export interface ProjectGoalModel {
    projectDetails ?: ProjectModel;
    projectGoals ?: ProjectGoalBaseModel;
}