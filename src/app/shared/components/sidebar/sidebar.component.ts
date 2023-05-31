import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 

  constructor(private gifsService:GifsService){
    
  }
  
  get listTags(){
    return this.gifsService.tagsHistory;
  }

  search(q:string):void{
    this.gifsService.searchTag(q);
  }

  cleanHistory():void{
    this.gifsService.cleanHistory();
  }
}
