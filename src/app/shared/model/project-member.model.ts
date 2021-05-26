import { ProjectUserTypeBaseModel } from './project-user-type-base.model';
import { ProjectModel } from './project.model';

export interface ProjectMemberModel {
    projectDetails ?: ProjectModel;
    projectAdministrator ?: ProjectUserTypeBaseModel;
    projectAssignees ?: ProjectUserTypeBaseModel;
    projectReviewers ?: ProjectUserTypeBaseModel;
}
