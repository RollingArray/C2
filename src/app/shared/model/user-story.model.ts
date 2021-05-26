/**
 * @author Ranjoy Sen
 */

import { ProjectModel } from './project.model';

export interface UserStoryModel extends ProjectModel {
    userStoryId ?: string;
    userStoryName ?: string;
    userStoryDescription ?: string;
    operationType ?: string;
}
