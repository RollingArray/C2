/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Project activity Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2021-04-29 11:19:55
 */

import { ProjectActivityBaseModel } from './project-activity-base.model';
import { ProjectModel } from './project.model';

export interface ProjectActivityModel {
    projectDetails ?: ProjectModel;
    projectActivities ?: ProjectActivityBaseModel;
}