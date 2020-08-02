import React from 'react';
import Link from '@material-ui/core/Link';
import TableCell from '../TableCell';
import TableRow from '../TableRow';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChartIcon from '@material-ui/icons/BarChart';
import CropFreeIcon from '@material-ui/icons/CropFree';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import './LinkItem.scss';

const ActionButton = ({ icon, ...otherProps }) => {
    return (
        <IconButton {...otherProps}>
            {icon}
        </IconButton>
    );
};

const LinkItem = ({ 
        destinationLink,
        shortenLink,
        createdAt,
        viewsAmount 
    }) => {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Link 
                    href={destinationLink} 
                    noWrap={true} 
                    style={{display: 'inline-block', maxWidth: '400px', width: '100%'}}
                >
                    {destinationLink}
                </Link>
            </TableCell>
            <TableCell>
                <ActionButton icon={<FileCopyIcon  />} size="small"/>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <Link href={shortenLink}>
                    {shortenLink}
                </Link>
            </TableCell>
            <TableCell align="center">
                {createdAt}
            </TableCell>
            <TableCell align="center">
                {viewsAmount}
            </TableCell>
            <TableCell align="right">
                <ActionButton icon={<CropFreeIcon />} />
                <ActionButton icon={<EditIcon />} />
                <ActionButton color="primary" icon={<BarChartIcon />} />
                <ActionButton color="secondary" icon={<DeleteIcon />} />
            </TableCell>
        </TableRow>
    );
};

export default LinkItem;
