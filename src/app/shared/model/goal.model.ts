/**
 * @author Ranjoy Sen
 */

 import { OperatingUserModel } from './operating-user.model';
import { ProjectModel } from './project.model';

 export interface GoalModel extends ProjectModel, OperatingUserModel  {
     goalId ?: string;
     goalName ?: string;
     goalDescription ?: string;
     operationType ?: string;
 }