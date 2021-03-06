// @flow
import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid';
import moment from 'moment';

type Props = {
  classes: Object,
  discoveriesList: Array<{
    discoveryId: string,
    isFinished: boolean,
    namedGraph: string,
    sparqlEndpointIri: string,
    started: number,
    finished: number
  }>,
  onHandleSelectDiscoveryClick: Function,
  onHandleDiscoveryRowClicked: Function
};

const styles = () => ({
  root: {
    overflowX: 'auto'
  }
});

const DiscoveriesTableComponent = ({
  discoveriesList,
  onHandleSelectDiscoveryClick,
  onHandleDiscoveryRowClicked,
  classes
}: Props) => (
  <div>
    {discoveriesList && discoveriesList.length > 0 ? (
      <Paper classes={classes}>
        <Table>
          <TableHead>
            <TableRow key={uuid()}>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Info</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">SPARQL IRI</TableCell>
              <TableCell align="center">Named Graph IRI</TableCell>
              <TableCell align="center">Started at</TableCell>
              <TableCell align="center">Finished at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discoveriesList.map(discovery => (
              <TableRow key={uuid()}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  padding="checkbox"
                >
                  <Button
                    id={`button_${discovery.discoveryId}`}
                    size="small"
                    disabled={!discovery.isFinished}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      onHandleSelectDiscoveryClick(discovery.discoveryId);
                    }}
                  >
                    Continue
                  </Button>
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  padding="checkbox"
                >
                  <Button
                    id={`button_${discovery.discoveryId}`}
                    size="small"
                    disabled={!discovery.isFinished}
                    variant="contained"
                    color="primary"
                    onClick={() => onHandleDiscoveryRowClicked(discovery)}
                  >
                    Info
                  </Button>
                </TableCell>

                <TableCell align="center">
                  {discovery.isFinished ? 'Finished' : 'In progress'}
                </TableCell>
                <TableCell align="center">
                  {discovery.sparqlEndpointIri}
                </TableCell>
                <TableCell align="center">{discovery.namedGraph}</TableCell>
                <TableCell align="center">
                  {discovery.started === -1
                    ? 'N/A'
                    : moment.unix(discovery.started).format('lll')}
                </TableCell>
                <TableCell align="center">
                  {discovery.finished === -1
                    ? 'N/A'
                    : moment.unix(discovery.finished).format('lll')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    ) : (
      <Paper>
        <Typography component={'span'} variant="body1" gutterBottom>
          No discoveries found
        </Typography>
      </Paper>
    )}
  </div>
);

export default withStyles(styles)(DiscoveriesTableComponent);
