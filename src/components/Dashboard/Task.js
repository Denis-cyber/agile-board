import React from "react";
import { Typography, CardContent } from "@mui/material";
import { User } from "../common/User";

export const Task = ({ task }) => {
  return (
    <CardContent>
      <Typography color='textPrimary' gutterBottom style={{ fontSize: 18 }}>
        {task?.title}
      </Typography>
      <Typography color='textSecondary' gutterBottom>
        {task?.description}
      </Typography>
      {task.assignee && <User user={task.assignee} />}
    </CardContent>
  );
};
