import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    private readonly router = inject(Router);

    goToApprovalPage() {
        this.router.navigateByUrl('/app-approval-page');
    }
}
