/**
 * © Rolling Array https://rollingarray.co.in/
 *
 *
 * @summary Project activity base Model
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-04-29 11:19:35 
 * Last modified  : 2021-05-06 11:51:24
 */


import { ActivityModel } from './activity.model';

export interface ProjectActivityBaseModel {
  success ?: boolean;
  data ?: ActivityModel[];
}