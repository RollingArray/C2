/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Activity reviewer base model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:11:02 
 * Last modified  : 2021-05-06 11:52:44
 */


import { ActivityReviewerModel } from "./activity-reviewer.model";

export interface ActivityReviewerBaseModel {
    success ?: boolean;
    data ?: ActivityReviewerModel[];
  }