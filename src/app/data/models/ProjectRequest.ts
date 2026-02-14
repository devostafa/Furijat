import {User} from "./User";
import {SocialMedia} from "./SocialMedia";
import {Category} from "./Category";

export interface ProjectRequest {
  id : string
  title : string
  subtitle :string
  description :string
  categoryid : Category
  totalfundrequired : number
  email : string
  imagestoupload : File[]
  userId : string
  facebook : string
  x : string
  instagram : string
}
