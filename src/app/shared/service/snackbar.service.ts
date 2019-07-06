import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string = 'OK', duration: number = 3000): void {
    const config = {
      duration: duration
    };

    this.snackBar.open(message, action, config);
  }
}
