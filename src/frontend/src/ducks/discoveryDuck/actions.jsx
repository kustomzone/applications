import types from './types';

const addDiscoveryIdAction = ({ id } = {}) => ({
  type: types.SET_DISCOVERY_ID,
  discovery: {
    id
  }
});

const setPipelineGroupsAction = pipelineGroups => {
  return {
    type: types.SET_PIPELINE_GROUPS,
    pipelineGroups
  };
};

const setSelectedPipelineGroupAction = ({ selectedPipelineGroup } = {}) => {
  return {
    type: types.SET_SELECTED_PIPELINE_GROUP,
    selectedPipelineGroup
  };
};

export default {
  addDiscoveryIdAction,
  setPipelineGroupsAction,
  setSelectedPipelineGroupAction
};
