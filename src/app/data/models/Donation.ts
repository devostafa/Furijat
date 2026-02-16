import {Project} from "./Project";
import {User} from "./User";

export interface Donation {
  id : string
  userId : string
  user : User
  projectId : string
  project : Project
  paymentType : string
  donationAmount : number
  status : boolean
}
