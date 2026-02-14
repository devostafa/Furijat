import {Project} from "./Project";
import {User} from "./User";

export interface Donation {
  id : string
  userid : string
  user : User
  projectid : string
  project : Project
  paymenttype : string
  donationamount : number
  status : boolean
}
