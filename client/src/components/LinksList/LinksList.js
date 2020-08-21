import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import LinkItem from '../LinkItem';

import TableCell from '../TableCell';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Destination Link</TableCell>
                <TableCell>Shorten Link</TableCell>
                <TableCell align="right">Created Ago</TableCell>
                <TableCell align="right">Amount of views</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
    );
};  

const LinksList = () =>  {
    const classes = useStyles();

    return (
      <Paper elevation={4}>
          <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                  <TableHeader />
                  <TableBody>
                      <TableRow>
                          <TableCell colSpan={5} align="right">
                                <TextField 
                                    size="small"
                                    variant="outlined"
                                    placeholder="Search"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                                          <SearchIcon />
                                                        </InputAdornment>,
                                    }}
                                />
                          </TableCell>
                      </TableRow>
                      <LinkItem 
                          destinationLink="https://material-ui.com/ru/api/table-cell/"
                          shortenLink="https://material-ui.com"
                          createdAt="18 aug, 2020"
                          viewsAmount={1}
                      />
                      <LinkItem 
                          destinationLink="https://material-ui.com/components/material-icons/#material-icons"
                          shortenLink="https://material-ui.com"
                          createdAt="18 aug, 2020"
                          viewsAmount={1}
                      />
                      <LinkItem 
                          destinationLink="https://material-ui.com/components/material-icons/#material-icons"
                          shortenLink="https://material-ui.com"
                          createdAt="18 aug, 2020"
                          viewsAmount={1}
                      />
                  </TableBody>
              </Table>
          </TableContainer>
          <TablePagination 
                onChangePage={() => {}}
                component="div"
                rowsPerPageOptions={[5, 10, 25, 100]}
                count={3}
                rowsPerPage={5}
                page={0}
          />
      </Paper>
      
    );
}

export default LinksList;