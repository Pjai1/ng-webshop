import { Injectable } from '@angular/core';

@Injectable()
export class InternalServerError extends Error {
  details: any;

  constructor(status: number, statusText: string, error?: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, InternalServerError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }

    this.message = `There was an internal server error with status: ${status}`;
    this.details = error;
    this.status = status;
    this.statusText = statusText;
  }
}
