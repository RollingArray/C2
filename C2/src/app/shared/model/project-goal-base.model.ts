import { ProjectUserTypeModel } from './project-user-type.model';
import { GoalModel } from './goal.model';

export interface ProjectGoalBaseModel {
  success ?: boolean;
  data ?: GoalModel[];
}