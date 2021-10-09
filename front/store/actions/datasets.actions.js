import { createActionFactory } from '../../common/store/helpers';

const factory = createActionFactory('DATASETS');

export const getAllDataSets = factory.create('GET_ALL_DATASETS');
export const getAllDataSetsAsync = factory.createAsync('GET_ALL_DATASETS_ASYNC');

export const clearAllDataSetsErrors = factory.create('CLEAR_ALL_ERRORS');
export const clearAllDataSetsErrorsAsync = factory.createAsync('CLEAR_ALL_ERRORS_ASYNC');