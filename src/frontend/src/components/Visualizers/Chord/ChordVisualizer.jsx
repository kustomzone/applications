// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { VisualizersService } from '@utils';
import { CircularProgress } from '@material-ui/core';
import ChordDiagram from 'react-chord-diagram';
import palette from 'google-palette';
import uuid from 'uuid';

type Props = {
  classes: {
    progress: number
  },
  selectedResultGraphIri: string,
  handleSetCurrentApplicationData: Function
};

type State = {
  dataLoadingStatus: string,
  matrix: Array<Array<any>>,
  groupColors: Array<string>,
  groupLabels: Array<string>
};

const styles = theme => ({
  root: {
    height: '72vh'
  },
  filterSideBar: {
    overflowY: 'auto'
  },
  card: {},
  input: {},
  progress: {
    margin: theme.spacing.unit * 2,
    alignItems: 'center'
  }
});

class ChordVisualizer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dataLoadingStatus: 'loading',
      matrix: [],
      groupColors: [],
      groupLabels: []
    };
  }

  async componentDidMount() {
    const { handleSetCurrentApplicationData } = this.props;
    const nodesRequest = await VisualizersService.getChordNodes(
      this.props.selectedResultGraphIri
    );
    const nodesResponse = await nodesRequest.data;
    const nodeUris = nodesResponse.map(node => node.uri);
    const labels = nodesResponse.map(node => node.label.languageMap.nolang);

    const matrixRequest = await VisualizersService.getChordData(
      this.props.selectedResultGraphIri,
      nodeUris
    );
    const matrixData = await matrixRequest.data;

    const colors = palette('sol-accent', nodeUris.length).map(
      color => `#${color}`
    );

    this.setState({
      dataLoadingStatus: 'ready',
      matrix: matrixData,
      groupColors: colors,
      groupLabels: labels
    });

    handleSetCurrentApplicationData({
      id: uuid.v4(),
      applicationEndpoint: 'chord',
      selectedResultGraphIri: this.props.selectedResultGraphIri,
      visualizerCode: 'CHORD'
    });
  }

  render() {
    return this.state.dataLoadingStatus !== 'ready' ? (
      <CircularProgress />
    ) : (
      <ChordDiagram
        groupLabels={this.state.groupLabels}
        groupColors={this.state.groupColors}
        matrix={this.state.matrix}
        componentId={1}
        labelColors={this.state.groupLabels.map(() => 'whitesmoke')}
      />
    );
  }
}

export default withStyles(styles)(ChordVisualizer);