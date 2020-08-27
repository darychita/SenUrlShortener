import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import LinkItem from '../LinkItem';
import LinksContext from '../../context/links.context';

import TableCell from '../TableCell';
import { InputAdornment } from '@material-ui/core';
import TableHeader from './TableHeader';
import Loader from '../Loader';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableBodySpinner = () => (
    <TableRow>
        <TableCell align="center" colSpan={5}>
            <Loader />
        </TableCell>
    </TableRow>
);

const List = ({ links, start, end, deleteLink }) => {
    return (
        <>
            {
                links.slice(start, end).map((link) => (
                    <LinkItem key={link.uuid}
                        item={link}
                        deleteItem={deleteLink}
                    />
                ))
            }
        </>

    );
}

const LinksList = () =>  {
    const classes = useStyles();
    const { isLoading, 
            links, 
            rowsPerPage: [ rowsPerPage, setRowsPerPage ],
            page: [ page, setPage ],
            searchQuery: [ searchQuery, setSearchQuery ],
            deleteLinkItem 
    } = useContext(LinksContext);

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    };

    const searchQueryHandler = (e) => setSearchQuery(e.target.value);

    return (
      <Paper elevation={4}>
          <TableContainer>
              <Table className={classes.table}>
                <TableHeader />
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5} align="right">
                            <TextField 
                                size="small"
                                variant="outlined"
                                value={searchQuery}
                                onChange={searchQueryHandler}
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>,
                                }}
                            />
                        </TableCell>
                    </TableRow>

                  {
                      isLoading 
                      ? <TableBodySpinner />
                      : <List 
                            searchQuery
                            links={links} 
                            start={page * rowsPerPage}
                            end={page * rowsPerPage + rowsPerPage}
                            deleteLink={deleteLinkItem}
                        />
                  }
                  </TableBody>
              </Table>
          </TableContainer>
          <TablePagination 
                onChangePage={() => {}}
                component="div"
                rowsPerPageOptions={[5, 10, 25, 100]}
                count={links.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      </Paper>
      
    );
}

export default LinksList;