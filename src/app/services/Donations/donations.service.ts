import {Injectable} from '@angular/core';
import {Donation} from "../../data/models/Donation";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  //RESORTED TO USING PARAMETER IN URL ROUTING TO NAVIGATE BACK AND POP UP A MODAL WINDOW
  //donateOperationStatus = new BehaviorSubject(false)
  //currentDonationOperationStatus = this.donateOperationStatus.asObservable()

  constructor(private http : HttpClient) { }

  SubmitDonation(donationRequest : Donation) {
    return this.http.post<boolean>(environment.backendurl + "donations/donate",donationRequest)
  }

  GetDonations() {
    return this.http.get<Donation[]>(environment.backendurl + "donations/getdonations")
  }

  DecideDonation(donationId : string, decision : boolean) {
    return this.http.post<boolean>(environment + "donations/decidedonation", {donationId : donationId, decision: decision})
  }


}
