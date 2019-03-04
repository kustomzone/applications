import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Labels from './VisualizerControllerLabelsComponent';
import Toolbox from './VisualizerControllerToolboxComponent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = () => ({
  root: {
    flex: 1,
    flexGrow: 1
  },
  header: {
    marginBottom: '1rem',
    // marginRight: "1rem",
    marginLeft: '1rem',
    marginTop: '1rem',
    right: '-1rem'
  }
});

const VisualizerControllerHeaderComponent = ({
  classes,
  headerParams,
  onTitleChange,
  checkedRefresh,
  handleChange
}) => (
  <div className={classes.root}>
    <AppBar className={classes.header} position="static" color="default">
      <Toolbar>
        <Labels
          title={headerParams.title}
          subtitle={headerParams.subtitle}
          onTitleChange={onTitleChange}
        />
        <Toolbox handleChange={handleChange} checkedRefresh={checkedRefresh} />
      </Toolbar>
    </AppBar>
  </div>
);

VisualizerControllerHeaderComponent.propTypes = {
  checkedRefresh: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  headerParams: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(VisualizerControllerHeaderComponent);
