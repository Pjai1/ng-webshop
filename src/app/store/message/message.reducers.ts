import { MessageActions, SAVE_ERROR_MESSAGE, SAVE_SUCCESS_MESSAGE } from './message.actions';
export interface State {
  errorMessage: string;
  successMessage: string;
}

const initialState: State = {
  errorMessage: null,
  successMessage: null,
};

export function messagesReducer(state: State = initialState, action: MessageActions): State {
  switch (action.type) {
    case SAVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case SAVE_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}
