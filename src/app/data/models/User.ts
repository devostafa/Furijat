import {Project} from "./Project";
import {UserTypeEnum} from "../enums/userTypeEnum";
import {SocialMedia} from "./SocialMedia";
import {Donation} from "./Donation";

export interface User {
    id : string
    userName : string
    fullName : string
    userType : UserTypeEnum
    description : string
    phoneNumber : string
    email : string
    socialMedia : SocialMedia
    projects : Project[]
    donations : Donation[]
    profileImage : string
}
