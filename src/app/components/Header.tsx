"use client"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '@/redux/useReduxHooks';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { setSearchBar, setSubTitle } from "@/redux/features/headerSlice";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const {replace} = useRouter();

  const subTitle = useAppSelector((state) => state.headerReducer.subTitle);

  // preserve the search result
 if(searchParams.get("q")){
  const params = new URLSearchParams(searchParams);
  dispatch(setSearchBar(params.get("q")));
 }

 // Update the subtitle if the path is /course/id
 if(!pathName.includes("course")){
      dispatch(setSubTitle(""));
    }

  const handleSearchChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    term? params.set("q", term) : params.delete("query");
    replace(`${pathName}?${params.toString()}`);
    dispatch(setSearchBar(term));
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {subTitle? subTitle : "Course Manager"}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {handleSearchChange(e.target.value)}}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}