import { OperatingUserModel } from './operating-user.model';
import { ProjectUserTypeBaseModel } from './project-user-type-base.model';


export interface ProjectModel extends OperatingUserModel {
    addedUserId ?: string;
    assigneeUserId ?: string;
    reviewerUserId ?: string;
    projectId ?: string;
    projectName ?: string;
    projectDescription ?: string;
    requestFrom ?: string;
    userTypeId?: string;
    userTypeName?: string;
    rawDataKeys ?: string[];
    projectAdministrator ?: ProjectUserTypeBaseModel;
    projectAssignees ?: ProjectUserTypeBaseModel;
    projectReviewers?: ProjectUserTypeBaseModel;
    projectUserTypeId ?: string;
}
