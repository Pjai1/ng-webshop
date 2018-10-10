import * as fromMessages from './message.reducers';
import * as fromRoot from '../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getMessagesState = createFeatureSelector<fromRoot.State, fromMessages.State>('messages');

export const getSuccessMessageState = createSelector(getMessagesState, (state) => state.successMessage);
export const getErrorMessageState = createSelector(getMessagesState, (state) => state.errorMessage);
