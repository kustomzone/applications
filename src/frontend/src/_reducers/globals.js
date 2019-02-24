export default (state = {}, action) => {
  switch (action.type) {
    case "SET_DISCOVERY_ID":
      return { ...state, discoveryId: action.discovery.id };
    case "SET_SELECTED_DATASOURCES_EXAMPLE":
      return { ...state, datasourcesValues: action.datasourcesValues };
    case "SET_SELECTED_VISUALIZER":
      return { ...state, selectedVisualizer: action.selectedVisualizer };
    case "SET_SELECTED_RESULT_GRAPH_IRI":
      return {
        ...state,
        selectedResultGraphIri: action.selectedResultGraphIri
      };
    case "SET_USER_AUTHENTICATION_STATUS":
      return { ...state, authenticationStatus: action.authenticationStatus };

    default:
      return { ...state };
  }
};
