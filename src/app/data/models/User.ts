import {Project} from "./Project";
import {UserTypeEnum} from "../enums/userTypeEnum";
import {SocialMedia} from "./SocialMedia";

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
    profileImage : string
}
