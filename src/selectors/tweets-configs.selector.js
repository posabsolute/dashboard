import { createSelector } from 'reselect';

const getTweetsConfigs = (state) => state.tweetsConfigs;

export const tweetsConfigsSelector = createSelector(
  [ getTweetsConfigs],
  (listsConfigs) => {
    return {
      orderedConfigs: listsConfigs.sort((configsA, configsB) => configsA.order > configsB.order),
    };
  }
);
