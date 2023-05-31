import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'card-gif',
  templateUrl: './card-gif.component.html',
  styleUrls: ['./card-gif.component.css']
})
export class CardGifComponent implements OnInit{

  ngOnInit(): void {
    if(!this.gif || !this.classCard) throw new Error('Gif and classDiv properties is required');
  }

  @Input()
  gif!:Gif;

  @Input()
  public classCard!:string;
}
