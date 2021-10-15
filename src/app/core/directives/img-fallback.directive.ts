import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

  @Input() appImgFallback!:string;

  constructor(private eRef:ElementRef) { }

  @HostListener('error')
  loadFallbackOnError(){
    let element:HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    if(this.appImgFallback && !element.getAttribute('data-fallback')){

      element.setAttribute('data-fallback', '1');
      element.src = this.appImgFallback;
    }else{
      element.src = '/assets/img/fallback.png';

    }
  }

}
