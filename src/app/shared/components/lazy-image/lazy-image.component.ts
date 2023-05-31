import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{
  public hasLoaded:boolean=false;
  ngOnInit(): void {
    if(!this.url) throw new Error("Property url is required");
  }

  @Input()
  public url!:string;

  onLoaded():void{
    this.hasLoaded = true;
  }

}
