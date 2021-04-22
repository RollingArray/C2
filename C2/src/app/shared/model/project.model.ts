import { ProjectUserTypeBaseModel } from './project-user-type-base.model';


export interface ProjectModel {
    userId ?: string;
    addedUserId ?: string;
    projectId ?: string;
    projectName ?: string;
    projectDescription ?: string;
    requestFrom ?: string;
    userTypeId ?: string;
    operationType ?: string;
}
