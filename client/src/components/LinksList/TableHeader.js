import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '../TableCell';
import TableRow from '@material-ui/core/TableRow';

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

export default TableHeader;
