// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Labels from './VisualizerControllerLabelsComponent';
import Toolbox from './VisualizerControllerToolboxComponent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  classes: { root: {}, header: {} },
  headerParams: { title: string, subtitle?: string }
};

const styles = () => ({
  root: {
    flex: 1,
    flexGrow: 1
  },
  header: {
    marginBottom: '1rem',
    marginLeft: '1rem',
    marginTop: '1rem',
    right: '-1rem'
  }
});

const VisualizerControllerHeaderComponent = (props: Props) => (
  <div className={props.classes.root}>
    <AppBar className={props.classes.header} position="static" color="default">
      <Toolbar>
        <Labels
          title={props.headerParams.title}
          subtitle={props.headerParams.subtitle}
        />
        <Toolbox />
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(VisualizerControllerHeaderComponent);
