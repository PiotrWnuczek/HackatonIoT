import React, { useState } from "react";
import { connect } from "react-redux";
import { createDevice } from "store/devicesActions";
import { Formik } from "formik";
import { Box, Dialog, Button, Avatar, Typography } from "@mui/material";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import TextInput from "atoms/TextInput";

const CreateDialog = ({ createDevice }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <ListItem
        sx={{ textTransform: "uppercase" }}
        onClick={() => setOpen(true)}
        button
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <AddCircle />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Dodaj Sensor" />
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ mb: 2 }} variant="h6">
            Dodaj Nowy Sensor
          </Typography>
          <Formik
            initialValues={{
              key: "",
              name: "",
              description: "",
              location: "",
            }}
            onSubmit={(values) => {
              createDevice(values);
              setOpen(false);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id="create">
                <TextInput
                  onChange={handleChange}
                  value={values.key}
                  label="Key"
                  name="key"
                  type="text"
                  size="small"
                  autoFocus
                  required
                />
                <TextInput
                  onChange={handleChange}
                  value={values.name}
                  label="Name"
                  name="name"
                  type="text"
                  size="small"
                  required
                />
                <TextInput
                  onChange={handleChange}
                  value={values.description}
                  label="Description"
                  name="description"
                  type="text"
                  size="small"
                  rows={2}
                  multiline
                />
                <TextInput
                  onChange={handleChange}
                  value={values.location}
                  label="Location"
                  name="location"
                  type="text"
                  size="small"
                  rows={2}
                  multiline
                />
              </form>
            )}
          </Formik>
          <Button
            sx={{ mr: 1 }}
            type="submit"
            variant="outlined"
            form="create"
            size="small"
          >
            Add Device
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createDevice: (data) => dispatch(createDevice(data)),
});

export default connect(null, mapDispatchToProps)(CreateDialog);
