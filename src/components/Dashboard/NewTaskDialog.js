import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormLabel,
  FormControl,
  Select,
  DialogActions,
  Button,
} from "@mui/material";
import { useStore } from "../../hooks/useStore";

export const NewTaskDialog = observer(({ open, handleClose = () => {}, activeSection }) => {
  const { users, boards } = useStore();
  const [formState, setFormState] = useState({ title: "", description: "", assignee: "" });

  console.log("formState", formState);

  const addNewTask = useCallback(
    (event) => {
      event.preventDefault();

      boards.active.addTask(activeSection, formState);
      handleClose();
      setFormState({ title: "", description: "", assignee: "" });
    },
    [formState, boards, activeSection, handleClose]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Creating A New Task:</DialogTitle>
      <form onSubmit={addNewTask}>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              required
              type='text'
              label='Title'
              onChange={(event) =>
                setFormState((prevState) => ({ ...prevState, title: event.target.value }))
              }
              value={formState?.title || ""}
            />
            <TextField
              fullWidth
              style={{ marginTop: "15px" }}
              required
              type='text'
              label='Description'
              onChange={(event) =>
                setFormState((prevState) => ({ ...prevState, description: event.target.value }))
              }
              value={formState?.description || ""}
            />
          </Box>
          <Box marginTop={1}>
            <FormControl fullWidth>
              <FormLabel>Assignee</FormLabel>
              <Select
                required
                native
                style={{ width: "100%" }}
                value={formState?.assignee || ""}
                onChange={(event) =>
                  setFormState((prevState) => ({ ...prevState, assignee: event.target.value }))
                }
              >
                <option value='' disabled>
                  -
                </option>
                {users.list.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button color='primary' type='submit'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
