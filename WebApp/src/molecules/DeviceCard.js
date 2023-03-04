import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { removeDevice, removeData, resetData } from 'store/devicesActions';
import { firebaseConnect } from 'react-redux-firebase';
import { Typography, LinearProgress, Avatar, Button } from '@mui/material';
import { Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { FolderOpen, MoreVert } from '@mui/icons-material';
import DeviceChart from 'atoms/DeviceChart';

const DeviceCard = ({ removeDevice, removeData, resetData, device, controller }) => {
  const [options, setOptions] = useState(false);

  return (
    <Card
      sx={{ borderRadius: 2 }}
      variant='outlined'
    >
      <CardHeader
        title={'Name: ' + device.name + ' | Key: ' + device.key}
        subheader={'Description: ' + device.description}
        avatar={<Avatar>
          <FolderOpen />
        </Avatar>}
        action={<>
          {options && <>
            <Button
              sx={{ ml: 1 }}
              onClick={() => {
                removeDevice(device.id);
                removeData(device.key);
              }}
              variant='outlined'
              color='error'
              size='small'
            >
              Delete
            </Button>
            <Button
              sx={{ ml: 1 }}
              onClick={() => resetData(device.key)}
              variant='outlined'
              size='small'
            >
              Reset
            </Button>
          </>}
          <IconButton
            onClick={() => setOptions(!options)}
            size='samll'
          >
            <MoreVert />
          </IconButton>
        </>}
      />
      <CardContent>
        {controller && controller.stamps && <>
          <Typography>Activations Chart:</Typography>
          <DeviceChart
            stamps={Object.values(controller.stamps)}
          />
        </>}
        {controller && controller.level && <>
          <Typography>Liquid Level:</Typography>
          <LinearProgress
            sx={{ mt: 2, height: 5, borderRadius: 5 }}
            variant='determinate'
            value={controller.level}
          />
        </>}
      </CardContent>
    </Card>
  )
};

const mapStateToProps = (state, props) => ({
  controller: state.firebase.data[props.device.key],
});

const mapDispatchToProps = (dispatch) => ({
  removeDevice: (id) => dispatch(removeDevice(id)),
  removeData: (key) => dispatch(removeData(key)),
  resetData: (key) => dispatch(resetData(key)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(props => [props.device.key]),
)(DeviceCard);
