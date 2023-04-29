import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Input() data1?: string;
  @Input() data2?: string;

  close() {
    this.onClose.emit(true);
  }
}
