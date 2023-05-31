import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList:Gif[] = [];

  private API_KEY:string ="rrCuAoziiJwCMRMcYgHKsSVXGdi51vWr";
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory :string[] = [];

  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
  }
  
  get tagsHistory():string[]{
    return [...this._tagsHistory];
  }

  searchTag(tag:string):void{
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.API_KEY)
      .set('q',tag)
      .set('limit',10)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
      .subscribe( (resp) => this.gifsList = resp.data )
  }

  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();
    //Si el parametro de busqueda ya se encuentra en la lista lo eliminamos y lo colocamos al principio de la lista
    //para que se muestren ordenados
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((item:string)=>item != tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }

  cleanHistory():void{
    localStorage.removeItem('history');
    this._tagsHistory = [];
  }
}

