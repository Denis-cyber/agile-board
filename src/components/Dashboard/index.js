import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Paper, Typography, Box, Grid, Button } from "@mui/material";
import { Column } from "./Column";
import { useStore } from "../../hooks/useStore";
import { NewTaskDialog } from "./NewTaskDialog";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  minHeight: 500,
});

export const Dashboard = observer(() => {
  const { boards } = useStore();
  const [newTaskToSection, setNewTaskToSection] = useState(null);

  const closeDialog = useCallback(() => setNewTaskToSection(null), [setNewTaskToSection]);

  const onDragEndHandler = useCallback(
    (event) => {
      const { source, destination, draggableId: taskId } = event;

      boards.active.moveTask(taskId, source, destination);
    },
    [boards]
  );

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Grid container spacing={1}>
          {boards.active?.sections.map((section) => (
            <Grid item key={section.id} xs>
              <Paper>
                <Box p={1} display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h5'>{section?.title}</Typography>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                      setNewTaskToSection(section.id);
                    }}
                  >
                    Add new task
                  </Button>
                </Box>
                <Droppable droppableId={section.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Column section={section} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTaskToSection}
        handleClose={closeDialog}
        activeSection={newTaskToSection}
      />
    </Box>
  );
});
