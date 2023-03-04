import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { removeDevice, removeData, resetData } from "store/devicesActions";
import { firebaseConnect } from "react-redux-firebase";
import { Typography, LinearProgress, Avatar, Button } from "@mui/material";
import { Card, CardHeader, CardContent, IconButton } from "@mui/material";
import { Place, MoreVert } from "@mui/icons-material";
import DeviceChart from "atoms/DeviceChart";

const DeviceCard = ({
  removeDevice,
  removeData,
  resetData,
  device,
  controller,
}) => {
  const [options, setOptions] = useState(false);

  return (
    <Card sx={{ borderRadius: 2 }} variant="outlined">
      <CardHeader
        title={
          <>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Miejsce: {device.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Opis: {device.description}
            </Typography>
          </>
        }
        subheader={
          <Typography sx={{ fontWeight: 600 }}>Key: {device.key}</Typography>
        }
        avatar={
          <Avatar>
            <Place />
          </Avatar>
        }
        action={
          <>
            {options && (
              <>
                <Button
                  sx={{ ml: 1 }}
                  onClick={() => {
                    removeDevice(device.id);
                    removeData(device.key);
                  }}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  onClick={() => resetData(device.key)}
                  variant="outlined"
                  size="small"
                >
                  Reset
                </Button>
              </>
            )}
            <IconButton onClick={() => setOptions(!options)} size="samll">
              <MoreVert />
            </IconButton>
          </>
        }
      />
      <CardContent>
        {controller && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Ilość ludzi w poszczególnych godzinach:
            </Typography>
            <DeviceChart
              plus={Object.values(controller.plus ?? 0)}
              minus={Object.values(controller.minus ?? 0)}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Ilość osób czekających w kolejce: {controller.queue ?? 0} osób
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Przewidywany czas oczekiwania: {(controller.queue ?? 0) * 5} minut
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
              Długość kolejki w czasie rzeczywistym:
            </Typography>
            <LinearProgress
              sx={{ mt: 2, height: 10, borderRadius: 10 }}
              variant="determinate"
              value={controller.queue ?? 0}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
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
  firebaseConnect((props) => [props.device.key])
)(DeviceCard);
