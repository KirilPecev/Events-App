import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Position } from "../models/position-model";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  private positionPath = environment.apiUrl + "positions";

  constructor(private http: HttpClient) {}

  getAvailablePositions(eventId: number): Observable<Array<Position>> {
    const params = new HttpParams().set("eventId", eventId.toString());
    return this.http.get<Array<Position>>(this.positionPath + "/available", { params });
  }

  getBusyPositions(eventId: number): Observable<Array<Position>> {
    const params = new HttpParams().set("eventId", eventId.toString());
    return this.http.get<Array<Position>>(this.positionPath + "/busy", { params });
  }

  join(data) {
    return this.http.put(this.positionPath + "/join", data);
  }

  unjoin(data) {
    return this.http.put(this.positionPath + "/unjoin", data);
  }
}
