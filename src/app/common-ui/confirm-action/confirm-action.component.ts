import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-action',
  imports: [],
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss',
})
export class ConfirmActionComponent {
  @Input()
  text: string = '';
  @Output()
  confirm = new EventEmitter<void>();
  @Output()
  close = new EventEmitter<void>();

  closeConfirm(): void {
    this.close.emit();
  }

  confirmFunc() {
    this.confirm.emit();
  }
}
