import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    signal,
    ViewChild,
    WritableSignal,
} from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Items } from '../../model/dropdown-item';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { startWith, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    imports: [
        AutocompleteLibModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
    ],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.css',
})
export class AutocompleteComponent {
    @Input() data: WritableSignal<Items[]> = signal<Items[]>([]);
    @Input() keyword: string;
    @Input() isInvalid: boolean;
    @Output() selectEvent = new EventEmitter<Items>();
    @ViewChild('inputAutoComplete') input: ElementRef<HTMLInputElement>;
    fileteredData: Items[];
    myControl = new FormControl('');
    // options: WritableSignal<Items[]> = signal<Items[]>([]);
    @Input() data$: Observable<Items[]>;

    ngOnInit(): void {
        this.fileteredData = this.data();
        this.data$.subscribe(() => {
            console.log(
                'dropdown data change, cur val: ' + this.myControl.value
            );
            this.myControl.reset();
        });
    }

    // onSelectOption(item): void {
    //     this.selectEvent.emit(item);
    // }

    onSelectOption(): void {
        //this.selectEvent.emit(this.myControl.value as Item);
        const val: string = this.myControl.value;
        this.selectEvent.emit(this.data().find((d) => d.value == val));
    }

    filter(): void {
        const filterValue = this.input.nativeElement.value.toLowerCase();
        this.fileteredData = this.data().filter((d) =>
            d.value.toLowerCase().includes(filterValue)
        );
    }
    // onSelectOption(): void {
    //     console.log(this.selectedItem.value);
    //     this.selectEvent.emit(this.selectedItem);
    // }
}
