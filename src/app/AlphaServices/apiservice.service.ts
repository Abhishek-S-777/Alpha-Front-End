import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) {

  }

  // Connect Front-end to back-end
  baseUrl = 'http://localhost:3000/';
  tbl_artist_base = 'artist_base';
  tbl_artist_reference = 'artist_reference';
  tbl_song_base = 'song_base';
  tbl_song_reference = 'song_reference';
  tbl_user_base = 'user_base';
  tbl_user_reference = 'user_reference';

  apiUrl = 'http://localhost:3000/user';

   // Get the base directory of the server
   getBaseDirectory():Observable<any>{
    return this.http.get(this.baseUrl+'cover_art');
  }

  // Operations on Song table..

  // Insert into song table
  // Insert into song_base table
  insertSongBaseTable(data:any): Observable<any>{
    console.log("Insert song base",data)
    return this.http.post(this.baseUrl+this.tbl_song_base, data);
  }

  // get all songs from song_base table
  getSongBaseTable(): Observable<any>{
    return this.http.get(this.baseUrl+this.tbl_song_base);
  }

  // Get the last inserted ID
  getLastInsertedID(): Observable<any>{
    return this.http.get(this.baseUrl+"song_base_id");
  }

  // Insert into song_reference table
  insertSongReferenceTable(data:any): Observable<any>{
    console.log("Reference table inserted")
    return this.http.post(this.baseUrl+this.tbl_song_reference, data);
  }

  // Inner join on song table.
  innerJoinSongTable():Observable<any>{
    return this.http.get(this.baseUrl+"song_inner_join");
  }

  // Operations on Artist table..

  // Insert into artist table
  // Insert into artist_base table
  insertArtistBaseTable(data:any): Observable<any>{
    return this.http.post(this.baseUrl+this.tbl_artist_base, data);
  }

  // Get the last inserted ID
  getLastInsertedIDArtist(): Observable<any>{
    return this.http.get(this.baseUrl+"artist_base_id");
  }

  // Get all artist name
  getArtistName():Observable<any>{
    return this.http.get(this.baseUrl+'artist_names');
  }
  // Insert into artist_reference table
  insertArtistReferenceTable(data:any): Observable<any>{
    console.log("Reference table inserted")
    return this.http.post(this.baseUrl+this.tbl_artist_reference, data);
  }

   // Inner join on song table.
  innerJoinArtistTable():Observable<any>{
    return this.http.get(this.baseUrl+"artist_inner_join");
  }

  // operation on user table..
  // Signup..
  userSignup(data:any):Observable<any>{
    return this.http.post(this.baseUrl + "user_base",data);
  }

  // Get last signed up user's ID..
  userSingupID():Observable<any>{
    return this.http.get(this.baseUrl+"user_base_id")
  }

  // Login..
  userLogin(data:any):Observable<any>{
    return this.http.get(this.baseUrl+"user_base_login",{params:data})
  }

  // User rated songs details
  userRatingDetails(data:any):Observable<any>{
    console.log("User ratings details api called", data);
    return this.http.get(this.baseUrl+"user_reference_ratings",{params:data})
  }

  // Insert into user reference table
  insertUserReferenceTable(data:any): Observable<any>{
    return this.http.post(this.baseUrl+this.tbl_user_reference,data);
  }

  // Calculate average song rating from user_reference and insert it into song_base
  calculateAndInsertAverageSongRating():Observable<any>{
    return this.http.get(this.baseUrl+"user_reference_avg_song_rating");
  }


  // User rated artist details
  userArtistRatingDetails(data:any):Observable<any>{
    console.log("User artist ratings details api called", data);
    return this.http.get(this.baseUrl+"user_reference_artist_ratings",{params:data})
  }

  // Insert into user artist reference table
  insertUserArtistReferenceTable(data:any): Observable<any>{
    return this.http.post(this.baseUrl+"user_reference_artist",data);
  }

  // Calculate average song rating from user_reference and insert it into song_base
  calculateAndInsertAverageArtistRating():Observable<any>{
    return this.http.get(this.baseUrl+"user_reference_avg_artist_rating");
  }







}
