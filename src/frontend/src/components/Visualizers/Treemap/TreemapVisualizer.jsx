import React, { PureComponent } from 'react';
import Chart from 'react-google-charts';
import { withStyles } from '@material-ui/core/styles';
import { VisualizersService } from '@utils';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

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
    margin: theme.spacing.unit * 2
  }
});

const transformData = data => {
  return data.map(row => {
    return [
      { v: row.id, f: row.label.languageMap.en },
      row.parentId,
      row.size,
      Math.floor(Math.random() * Math.floor(100))
    ];
  });
};

class TreemapVisualizer extends PureComponent {
  constructor() {
    super();
    this.state = { dataLoadingStatus: 'loading', chartData: [] };
  }

  async componentDidMount() {
    const response = await VisualizersService.getSkosScheme(
      'http://linked.opendata.cz/resource/concept-scheme/cpv-2008'
    );
    const headers = [['id', 'parentId', 'size', 'color']];
    const jsonData = await response.json();
    const chartData = headers.concat(transformData(jsonData));
    this.setState({
      dataLoadingStatus: 'ready',
      chartData
    });
  }

  render() {
    const { classes } = this.props;
    return this.state.dataLoadingStatus === 'ready' ? (
      <Chart
        width={'100%'}
        height={'72vh'}
        chartType="TreeMap"
        loader={<div>Loading Chart</div>}
        data={this.state.chartData}
        options={{
          headerHeight: 20,
          fontColor: 'black',
          showScale: true,
          maxDepth: 1,
          highlightOnMouseOver: true,
          minHighlightColor: '#8c6bb1',
          midHighlightColor: '#9ebcda',
          maxHighlightColor: '#edf8fb',
          minColor: '#009688',
          midColor: '#f7f7f7',
          maxColor: '#ee8100'
        }}
      />
    ) : (
      <CircularProgress className={classes.progress} />
    );
  }
}
TreemapVisualizer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TreemapVisualizer);
