import { Injectable } from '@angular/core';

@Injectable()
export class NotFoundError extends Error {
  constructor(status: number, statusText: string, response?: any) {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, NotFoundError.prototype);

    if (this.name === undefined || this.name === 'Error') {
      this.name = this.constructor.name;
    }

    this.message = `The resource could not be found with status: ${status}`;
    this.details = response.error;
    this.status = status;
    this.statusText = statusText;
  }
}
