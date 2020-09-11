import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinkItem from '../LinkItem';
import LinksContext from '../../context/links.context';

import TableCell from '../TableCell';
import { InputAdornment } from '@material-ui/core';
import TableHeader from './TableHeader';
import Loader from '../Loader';

import './LinksList.scss';

const useStyles = (matches) => makeStyles((theme) => ({
    headerSearch: {
        justifyContent: 'center',
        background: matches ? theme.palette.primary.main : 'transparent',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: matches ? 'white' : theme.palette.grey[400]
            },
            '&:hover fieldset': {
                borderColor: matches ? 'white' : theme.palette.text.primary,
            },
            '&.Mui-focused fieldset': {
                borderColor: matches ? 'white' : theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-input, & .MuiSvgIcon-root': {
                color: matches ? 'white' : theme.palette.text.primary
            }
        },      
    }
}));

const TableBodySpinner = () => (
    <TableRow>
        <TableCell align="center" colSpan={5}>
            <Loader />
        </TableCell>
    </TableRow>
);

const List = ({ links, start, end, deleteLink }) => {
    if (!links.length) {
        return (
            <TableRow>
                <TableCell colSpan={5}>
                    <Typography variant="body1" align="center">No links yet.</Typography>
                </TableCell>
            </TableRow>
        );
        
    }
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
    const matches = useMediaQuery('(max-width: 810px)');
    const { isLoading, 
            links, 
            rowsPerPage: [ rowsPerPage, setRowsPerPage ],
            page: [ page, setPage ],
            searchQuery: [ searchQuery, setSearchQuery ],
            deleteLinkItem 
    } = useContext(LinksContext);

    const { headerSearch } = useStyles(matches)();


    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    };

    const searchQueryHandler = (e) => setSearchQuery(e.target.value);
    let pagination = null;

    if (links.length) {
        pagination = (
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
        );
    }

    return (
      <Paper elevation={4}>
          <TableContainer>
              <Table className="links-list-body">
                {
                    !matches ? <TableHeader /> : null
                }
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5} align="right" className={headerSearch}>
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
          { pagination }
      </Paper>
      
    );
}

export default LinksList;