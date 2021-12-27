/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Next Step model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-11-06 15:37:41
 */

import { RouteChildrenModel } from "./route.model";

export interface NextStepModel {
	image: string;
	
	steps: RouteChildrenModel[];
}