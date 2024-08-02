import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-approval-page',
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: './approval-page.component.html',
    styleUrl: './approval-page.component.css',
})
export class ApprovalPageComponent {}
