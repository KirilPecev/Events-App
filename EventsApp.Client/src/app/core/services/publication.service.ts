import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Publication } from "../models/publication-model";

@Injectable({
  providedIn: "root",
})
export class PublicationService {
  private publicationPath = environment.apiUrl + "publication";

  constructor(private http: HttpClient) {}

  create(data): Observable<Publication> {
    return this.http.post<Publication>(this.publicationPath + "/create", data);
  }

  edit(data): Observable<Publication> {
    return this.http.put<Publication>(this.publicationPath + "/update", data);
  }

  delete(id: number) {
    return this.http.delete(this.publicationPath + "/" + id);
  }

  getPublications(): Observable<Array<Publication>> {
    return this.http.get<Array<Publication>>(this.publicationPath + "/getall");
  }

  getMinePublications(): Observable<Array<Publication>> {
    return this.http.get<Array<Publication>>(this.publicationPath + "/mine");
  }

  like(id) {
    return this.http.put<Publication>(this.publicationPath + "/like", id);
  }

  unlike(id) {
    return this.http.put<Publication>(this.publicationPath + "/unlike", id);
  }

  share(id) {
    return this.http.put<Publication>(this.publicationPath + "/share", id);
  }
}
