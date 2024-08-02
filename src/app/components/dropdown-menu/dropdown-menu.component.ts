import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';
import { Items } from '../../model/dropdown-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  // locations = locations;
  selectedItem: Items;
  @Input() options: Items[] = [];
  @Input() isInvalid: boolean;
  @Output() selectEvent = new EventEmitter<Items>();

  onSelectOption():void {
    console.log(this.selectedItem.value);
    this.selectEvent.emit(this.selectedItem);
  }
}
