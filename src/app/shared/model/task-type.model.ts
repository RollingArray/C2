/**
 * @author Ranjoy Sen
 */

import { ProjectModel } from './project.model';

export interface TaskTypeModel extends ProjectModel {
    taskTypeId ?: string;
    taskTypeName ?: string;
    taskTypeDescription ?: string;
    operationType ?: string;
}
