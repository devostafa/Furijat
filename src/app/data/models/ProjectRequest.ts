import {CategoryEnum} from "../enums/categoryEnum";
import {SocialMedia} from "./SocialMedia";

export interface ProjectRequest {
  id : string
  title : string
  description :string
  categoryId : CategoryEnum
  ibanNumber? : string
  instapayId? : string
  fundRequired : number
  email : string
  imagesToUpload? : File[]
  userId : string
  socialMedia : SocialMedia
}
