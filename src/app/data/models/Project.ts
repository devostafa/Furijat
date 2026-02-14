import {User} from "./User";
import {SocialMedia} from "./SocialMedia";
import {Category} from "./Category";
import {Donation} from "./Donation";

export interface Project {
  id : string
  title : string
  subtitle :string
  description :string
  categoryId : string
  category : Category
  currentFund : number
  totalFundRequired : number
  email : string
  phoneNumber : string
  imagesNames : string[]
  imagesToUpload? : File[]
  userId : string
  user : User
  donations : Donation[]
  status : boolean
  x : string
  facebook : string
  instagram : string
}
