import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import { ListItemText } from "@mui/material";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  drawerContainer: {
    overflow: "auto",
  },
  toolbar: theme.mixins.toolbar,
  listItemText: { color: "#FFF" },
}));

export default function AppAndSideBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleArticleButton = () => {
    navigate("/blog");
  };

  const handleNewsButton = () => {
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Stock News & Articles
          </Typography>
          <Stack direction={"row"} sx={{ marginLeft: "auto" }}>
            <Button sx={{ color: "#fff" }} onClick={handleNewsButton}>
              News
            </Button>
            <Button sx={{ color: "#fff" }} onClick={handleArticleButton}>
              Articles
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItem button>
                <br />
                <LibraryBooksIcon sx={{ color: "#fff" }} />
                <ListItemText
                  primary="News"
                  style={{ marginLeft: 10 }}
                  className={classes.listItemText}
                />
              </ListItem>
            </Link>
            <Link to="/blog" style={{ textDecoration: "none" }}>
              <ListItem button>
                <MailIcon sx={{ color: "#fff" }} />
                <ListItemText
                  primary="Articles"
                  style={{ marginLeft: 10 }}
                  className={classes.listItemText}
                />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
