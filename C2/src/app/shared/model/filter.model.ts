/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Filter Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-05-01 19:48:29
 */


import { ProjectModel } from "./project.model";

export interface FilterModel extends ProjectModel {
    sprintId ?: string;
    sprintName ?: string;
    goalId ?: string;
    goalName ?: string;
    assignedUserId ?: string;
    userFirstName ?: string;
    userLastName ?: string;
    userEmail ?: string;
}