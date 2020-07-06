import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Event } from "../models/event-model";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private eventPath = environment.apiUrl + "events";

  constructor(private http: HttpClient) {}

  create(data): Observable<Event> {
    return this.http.post<Event>(this.eventPath, data);
  }

  edit(data): Observable<Event> {
    return this.http.put<Event>(this.eventPath, data);
  }

  delete(id: number) {
    return this.http.delete(this.eventPath + "/" + id);
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath);
  }

  getMineEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath + "/mine");
  }

  getDetails(id): Observable<Event> {
    return this.http.get<Event>(this.eventPath + "/" + id);
  }
}
