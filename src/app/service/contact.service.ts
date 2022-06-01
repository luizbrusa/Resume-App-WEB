import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../app-constants";
import { Contact } from "../model/contact.model";

@Injectable({ 
    providedIn: "root" 
})
export class ContactService {

    private url: string = AppConstants.urlPath;

    constructor(private http: HttpClient) { }

    enviarEmail(contact: Contact): Observable<any> {
        return this.http.post(this.url + 'enviarEmail', contact);
    }

}
