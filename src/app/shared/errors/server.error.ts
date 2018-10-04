import { Injectable } from '@angular/core';

@Injectable()
export class ServerError extends Error {
  details: any;

  constructor(public status: number, public statusText: string, error?: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, ServerError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }

    this.message = `There was an internal server error with status: ${status}`;
    this.details = error;
  }
}
