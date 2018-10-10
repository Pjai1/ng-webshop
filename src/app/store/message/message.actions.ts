import { Action } from '@ngrx/store';

export const SAVE_ERROR_MESSAGE = 'Save Error Message';
export const SAVE_SUCCESS_MESSAGE = 'Save Success Message';

export class SaveErrorMessageAction implements Action {
  readonly type = SAVE_ERROR_MESSAGE;

  constructor(public payload: string) {}
}

export class SaveSuccessMessageAction implements Action {
  readonly type = SAVE_SUCCESS_MESSAGE;

  constructor(public payload: string) {}
}

export type MessageActions = SaveErrorMessageAction | SaveSuccessMessageAction;
