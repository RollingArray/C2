/**
 * @author Ranjoy Sen
 */

 import { ProjectModel } from './project.model';

 export interface GoalModel extends ProjectModel {
     goalId ?: string;
     goalName ?: string;
     goalDescription ?: string;
     operationType ?: string;
 }