import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from '@mui/icons-material/School';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Link from "@mui/material/Link";
import NextLink from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <Box sx={{ bgcolor: "background.paper", borderRight: "1px solid #e6e6e6" }}>
      <nav aria-label="Course Manager Pages">
        <List>
          <ListItem disablePadding>
            <Link href="/" color="secondary" component={NextLink} shallow={false}>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link href="/add" color="secondary" component={NextLink}>
            <ListItemButton>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="Add New" />
            </ListItemButton>
          </Link>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
