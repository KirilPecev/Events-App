import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Publication } from "../models/publication-model";

@Injectable({
  providedIn: "root",
})
export class PublicationService {
  private publicationPath = environment.apiUrl + "publications";

  constructor(private http: HttpClient) {}

  create(data): Observable<Publication> {
    return this.http.post<Publication>(this.publicationPath, data);
  }

  edit(data): Observable<Publication> {
    return this.http.put<Publication>(this.publicationPath, data);
  }

  delete(id: number) {
    return this.http.delete(this.publicationPath + "/" + id);
  }

  getPublications(): Observable<Array<Publication>> {
    return this.http.get<Array<Publication>>(this.publicationPath);
  }

  getPublicationsByUser(userId: string): Observable<Array<Publication>> {
    const params = new HttpParams().set("userId", userId);
    return this.http.get<Array<Publication>>(this.publicationPath + "/byuser", {params});
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
