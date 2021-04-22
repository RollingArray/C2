import { ProjectUserTypeModel } from './project-user-type.model';
import { SprintModel } from './sprint.model';

export interface ProjectSprintBaseModel {
  success ?: boolean;
  data ?: SprintModel[];
}