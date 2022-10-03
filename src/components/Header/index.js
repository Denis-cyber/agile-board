import React from "react";
import { observer } from "mobx-react-lite";
import { AppBar, Grid, Toolbar, Typography, FormControl, Select, Box } from "@mui/material";
import { User } from "../common/User";
import { useStore } from "../../hooks/useStore";

export const Header = observer(() => {
  const { boards, users } = useStore();

  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Box display='flex' alignItems='center'>
              <Typography variant='h6' color='inherit'>
                Dashboard:
              </Typography>
              <FormControl variant='outlined'>
                <Select
                  style={{
                    backgroundColor: "#ffffff",
                    marginLeft: 10,
                  }}
                  native
                  value={boards?.active?.id || ""}
                  onChange={(event) => boards.selectBoard(event.target.value)}
                >
                  <option value='' disabled>
                    -
                  </option>
                  {boards.list.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
