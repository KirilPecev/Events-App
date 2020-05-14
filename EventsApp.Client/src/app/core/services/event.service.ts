import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

Injectable();
export class EventService {
  private eventPath = environment.apiUrl + "event";

  constructor(private http: HttpClient) {}

  create(data): Observable<Event> {
    return this.http.post<Event>(this.eventPath + "/create", data);
  }
  
  edit(data): Observable<Event> {
    return this.http.put<Event>(this.eventPath + "/update", data);
  }

  delete(id: number) {
    return this.http.delete(this.eventPath + "/" + id);
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath + "/getall");
  }

  getMineEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(this.eventPath + "/mine");
  }

  getDetails(id): Observable<Event> {
    return this.http.get<Event>(this.eventPath + "/details/" + id);
  }
}
