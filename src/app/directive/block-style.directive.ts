import {
  AfterViewChecked, AfterViewInit,
  Directive, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlockStyleDirective implements OnInit, AfterViewInit, OnChanges{

  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter()

  private items: HTMLElement [];
  private index: number = 0;
  public activeElementIndex: number = 0;
// ссылается на тот элемент, где применяется, та или иная директива (позволяет ссылаться эл-ту)
  $event: KeyboardEvent;
  constructor( private  el: ElementRef) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.activeElementIndex = 0
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector); //позволяет ссылаться на дом-элемент (выборку)
      if (this.initFirst){
        if (this.items[0]){
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid darkred') //true значение, то будет подсвечиваться 1 эл-т
        }
      }
    }
    else {
      console.log('Не передан селектор')
    }

    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  initKeyUp (ev: KeyboardEvent): void | boolean {

    if(ev.key === 'ArrowRight'|| ev.key === 'ArrowLeft'){
      if (ev.key === "ArrowLeft" && this.index === 0){
        return false
      }
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight'){
      this.index++;
      if (this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid darkred')
      }
    } else if (ev.key === 'ArrowLeft'){
      this.index--;
      if (this.items[this.index])
         {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid darkred')
      }
    }
    if (this.index >= 0){
      this.activeElementIndex = this.index
    }

  }


  initStyle(index: number){
    if (this.items[index]){
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid darkred')
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }

}
