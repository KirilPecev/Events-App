import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PositionService {
    private publicationPath = environment.apiUrl + "position";

    constructor(private http: HttpClient) {}  
}
