/**
 * @author Ranjoy Sen
 * @email ranjoy.sen@mindtree.com
 * @create date 2019-07-11 09:47:29
 * @modify date 2019-07-11 09:47:29
 * @desc [description]
 */
import { ActivityReviewerBaseModel } from './activity-reviewer-base.model';
import { BaseModel } from './base.model';
import { ProjectUserTypeModel } from './project-user-type.model';
import { ProjectModel } from './project.model';
import { UserModel } from './user.model';

export interface CredibilityBase extends BaseModel {
  projectDetails ?: ProjectModel;
  credibilityScoreDetails ?: ProjectUserTypeModel;
  projectReviewDetails ?: ActivityReviewerBaseModel;
}
