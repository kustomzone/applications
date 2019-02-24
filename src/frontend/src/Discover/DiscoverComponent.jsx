import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Emoji from 'react-emoji-render';
import DiscoverInputSources from './DiscoverInputSources';
import DiscoverVisualizerPicker from './DiscoverVisualizerPicker';

const styles = theme => ({
  root: {
    width: '100%'
  },
  gridRoot: {
    flexGrow: 1
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  createAppButtons: {
    justifyContent: 'center'
  }
});

const getStepContent = step => {
  switch (step) {
    case 0:
      return <DiscoverInputSources />;
    case 1:
      return <DiscoverVisualizerPicker />;

    default:
      return 'Unknown step';
  }
};

const steps = [
  'Add Data Source IRIs',
  'Pick a visualizer',
  'Pick a source for execution',
  'Preview & create app'
];

// 'Pick a source for execution',
// 'Preview & create app'

const DiscoverComponent = ({
  classes,
  activeStep,
  onNextClicked,
  onBackClicked,
  onResetClicked
}) => (
  <div className={classes.root}>
    <Stepper
      activeStep={activeStep}
      style={{ backgroundColor: 'transparent' }}
      orientation="vertical"
    >
      {steps.map((label, step) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {step === 0 && <DiscoverInputSources />}
              {step === 1 && <DiscoverVisualizerPicker />}
              {step > 0 && (
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={onBackClicked}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onNextClicked}
                        className={classes.button}
                      >
                        Finish
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
    {activeStep === steps.length && (
      <Paper square elevation={0} className={classes.resetContainer}>
        <Typography>
          <Emoji text="All steps completed - nice job 👍" />
        </Typography>
        <Button onClick={onResetClicked} className={classes.button}>
          Reset
        </Button>
      </Paper>
    )}
  </div>
);

DiscoverComponent.propTypes = {
  activeStep: PropTypes.number,
  classes: PropTypes.object.isRequired,
  onBackClicked: PropTypes.func,
  onNextClicked: PropTypes.func,
  onResetClicked: PropTypes.func,
  steps: PropTypes.array
};

export default withStyles(styles)(DiscoverComponent);
