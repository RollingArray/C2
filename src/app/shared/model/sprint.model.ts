/**
 * @author Ranjoy Sen
 */

 import { OperatingUserModel } from './operating-user.model';
import { ProjectModel } from './project.model';
 import { UserPerformanceMatrixModel } from './user-performance-matrix.model';
 
 export interface SprintModel extends ProjectModel, OperatingUserModel {
     sprintId ?: string;
     sprintName ?: string;
     sprintStartDate ?: string;
     sprintEndDate ?: string;
     sprintStatus ?: string;
     sprintUserPerformanceStories ? : SprintUserPerformanceStoriesModel;
     totalWeightedPerformances ? : string;
     operationType ?: string;
 }
 
 export interface SprintUserPerformanceStoriesModel {
     success ? : boolean;
     data ?: UserPerformanceMatrixModel[];
 }