/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { trimStart } from 'lodash';
import { useSelector } from 'react-redux';

const sliceName = 'thunkStatuses';

const loadingTypesRegExp = new RegExp('(/pending|/fulfilled|/rejected)$');

/**
 * Для всех санков текущий статус будет сохраняться сюда.
 * Если для типа санка нет статуса, значит санк не был задействован
 */
const slice = createSlice({
  name: sliceName,
  reducers: {},
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => loadingTypesRegExp.test(action.type),
      (state, action) => {
        const [match] = action.type.match(loadingTypesRegExp);
        const fetchingStatus = trimStart(match, '/');
        const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');

        state[actionTypePrefix] = fetchingStatus;
      },
    );
  },
});

export const thunkStatusesSelectors = {
  selectState: (state) => state[sliceName],
  selectByType: (type) => (state) => state[sliceName][type] || ('idle'),
};

export const thunkStatusesReducer = slice.reducer;

export const useThunkStatus = (thunkAction) => {
  const actionStatus = useSelector(
    thunkStatusesSelectors.selectByType(thunkAction.typePrefix),
  );

  const result = useMemo(() => ({
    actionStatus,
    isPending: actionStatus === 'pending',
    isSuccess: actionStatus === 'fulfilled',
  }), [actionStatus]);

  return result;
};
