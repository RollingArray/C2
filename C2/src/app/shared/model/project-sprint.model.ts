import { ProjectSprintBaseModel } from './project-sprint-base.model';
import { ProjectModel } from './project.model';

export interface ProjectSprintModel {
    projectDetails ?: ProjectModel;
    projectSprints ?: ProjectSprintBaseModel;
}
