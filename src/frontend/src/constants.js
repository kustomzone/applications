const BASE_URL = "http://localhost:8080/";
const PIPELINES_URL = BASE_URL + "pipelines/";
const DISCOVERY_URL = BASE_URL + "discovery/";

export const DISCOVER_FROM_INPUT_URL = PIPELINES_URL + "discoverFromInput";
export const DISCOVER_FROM_URI_LIST_URL = PIPELINES_URL + "discover";
export const PIPELINE_GROUPS_URL = discoveryId => {
  return DISCOVERY_URL + discoveryId + "/pipelineGroups";
};