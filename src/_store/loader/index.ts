import { LoaderState } from './types';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { state } from './state';
import { LoaderActions, actions } from './actions';
import { LoaderGetters, getters } from './getters';

// https://github.com/vuejs/pinia/issues/802#issuecomment-1107925251
export type LoaderStore = Store<'loader', LoaderState, LoaderGetters, LoaderActions>;
export type LoaderStoreDefinition = StoreDefinition<'loader', LoaderState, LoaderGetters, LoaderActions>;

export const useLoader: LoaderStoreDefinition = defineStore('loader', { state, getters, actions });