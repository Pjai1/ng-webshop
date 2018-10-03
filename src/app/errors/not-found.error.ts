import { Injectable } from '@angular/core';

@Injectable()
export class NotFoundError extends Error {
  details: any;
  constructor(public status: number, public statusText: string, error?: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, NotFoundError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }

    this.message = `The resource could not be found with status: ${status}`;
    this.details = error;
  }
}
