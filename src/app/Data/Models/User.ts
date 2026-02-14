import {Project} from "./Project";
import {Donation} from "./Donation";

export interface User {
    id : string
    username : string
    password : string
    usertype : string
    description : string
    phoneNumber : string
    email : string
    facebook : string
    x_com : string
    instagram : string
    project : Project
    donations: Donation[]
    profileImage : string
}
