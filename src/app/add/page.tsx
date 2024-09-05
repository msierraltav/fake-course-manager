"use client";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useInsertNewMutation } from "@/redux/services/coursesApi";
import { useAppDispatch, useAppSelector } from '@/redux/useReduxHooks';
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { TCourse } from "@/lib/types";
import CloseIcon from "@mui/icons-material/Close";
import { setLastAdded } from "@/redux/features/headerSlice";

type Props = {};

const AddCourse = (props: Props) => {
  const [subject, setSubject] = useState<string>("");
  const [courseNumber, setCourseNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("Hello");

  const dispatch = useAppDispatch();

  const mutate =  useInsertNewMutation();
  const AddNewCourse = mutate[0];


  const handleSubmit = async () => {
    const newCourse: TCourse = {
      subject,
      courseNumber,
      description,
    };

    try {

        const {error, data} = await AddNewCourse(newCourse);

        if(error){
            setAlertMessage(`Error: ${error.data!}`);
            setOpen(true);
        }else{
            setAlertMessage("Course Added");
            setOpen(true);
            dispatch(setLastAdded(data))
        }


    } catch (err) {
        setAlertMessage(`Error: ${err}`);
        setOpen(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container className="flex flex-col h-full justify-left items-start gap-6">
      <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
        Add a new course
      </Typography>

      <div className="flex flex-col gap-4">
        <TextField
          required
          id="outlined-required"
          label="Subject"
          placeholder="ING"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Course Number"
          placeholder="007"
          autoSave="false"
          onChange={(e) => {
            setCourseNumber(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          placeholder="A super cool course"
          multiline
          maxRows={4}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
        action={action}
      />
    </Container>
  );
};

export default AddCourse;
