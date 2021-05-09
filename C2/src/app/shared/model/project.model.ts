import { ProjectUserTypeBaseModel } from './project-user-type-base.model';


export interface ProjectModel {
    userId ?: string;
    addedUserId ?: string;
    assigneeUserId ?: string;
    reviewerUserId ?: string;
    projectId ?: string;
    projectName ?: string;
    projectDescription ?: string;
    requestFrom ?: string;
    userTypeId ?: string;
    rawDataKeys ?: string[];
    operationType ?: string;
}
