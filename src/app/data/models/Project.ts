import {Donation} from "./Donation";
import {CategoryEnum} from "../enums/categoryEnum";
import {SocialMedia} from "./SocialMedia";
import {ProjectBank} from "./ProjectBank";
import {User} from "./User";
import {Category} from "./Category";

export interface Project {
  id : string
  title : string
  description :string
  bank : ProjectBank
  categoryId : CategoryEnum
  category : Category
  currentFund : number
  totalFundRequired : number
  email : string
  phoneNumber : string
  imagesNames : string[]
  userId : string
  user : User
  donations : Donation[]
  status : boolean
  socialMedia : SocialMedia
}
