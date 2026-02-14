import {Donation} from "./Donation";
import {CategoryEnum} from "../enums/categoryEnum";
import {SocialMedia} from "./SocialMedia";
import {ProjectBank} from "./ProjectBank";

export interface Project {
  id : string
  title : string
  description :string
  bank : ProjectBank
  categoryId : CategoryEnum
  currentFund : number
  totalFundRequired : number
  email : string
  phoneNumber : string
  imagesNames : string[]
  userId : string
  donations : Donation[]
  status : boolean
  socialMedia : SocialMedia
}
