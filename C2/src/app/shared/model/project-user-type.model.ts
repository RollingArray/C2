import { UserModel } from './user.model';


export interface ProjectUserTypeModel extends UserModel{
  userId ?: string;
  projectId ?: string;
  projectUserTypeId ?: string;
  projectMemberTypeName ?: string;
  operationType ?: string;
}