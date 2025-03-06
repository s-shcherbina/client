import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  imports: [],
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.scss',
})
export class SimpleModalComponent {
  @Input() isVisible: boolean = false;
  @Output()
  close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
