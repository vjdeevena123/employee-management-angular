import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  imports: [],
  templateUrl: './my-button.html',
  styleUrl: './my-button.css'
})
export class MyButton {
  @Input() btnText: string = 'Click Me';
  @Input() btnClass: string = 'btn btn-success';
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter<any>();

  onBtnClick(event: any) : void {
    this.btnClick.emit(event);
  }

}
