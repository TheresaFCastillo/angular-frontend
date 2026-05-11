import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'list.html'
})
export class ListComponent implements OnInit {
    accounts: any[] = [];
    loading = true;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .subscribe({
                next: accounts => {
                    this.accounts = accounts;
                    this.loading = false;
                },
                error: () => this.loading = false
            });
    }

    deleteAccount(id: string) {
        if (!confirm('Are you sure you want to delete this account?')) return;
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
            });
    }
}