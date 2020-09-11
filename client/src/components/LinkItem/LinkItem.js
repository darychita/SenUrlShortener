import React, { useState } from 'react';
import moment from 'moment';
import Copiable from '../wrappers/Copiable';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import TableCell from '../TableCell';
import TableRow from '../TableRow';
import UpdateForm from './UpdateForm';
import { IconButton, Button, useMediaQuery } from '@material-ui/core';
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
        item: {origin, endpoint, createdAt, views, uuid, description },
        deleteItem,
        updateItem
    }) => {

    const [ isCollapsed, setCollapsed ] = useState(false);

    return (
        <>
            <TableRow className="link-item-row">
                <TableCell scope="row">
                    <Link
                        href={origin} 
                        className="link"
                    >
                        {origin}
                    </Link>
                </TableCell>
                <TableCell>
                    <div className="link-dest-cell">
                        <Copiable textToCopy={endpoint}>
                            <ActionButton icon={<FileCopyIcon />}  size="small"/>
                        </Copiable>
                        <Link 
                            href={endpoint}
                            className="link link-dest"
                        >
                            {endpoint}
                        </Link>
                    </div>
                </TableCell>
                <TableCell align="center">
                    {moment(createdAt).format('ll')}
                </TableCell>
                <TableCell align="center">
                    {views}
                </TableCell>
                <TableCell align="right">
                    <ActionButton icon={<CropFreeIcon />} />
                    <ActionButton 
                        color={isCollapsed ? 'secondary' : 'default'}
                        icon={<EditIcon />} 
                        onClick={() => setCollapsed((isCollapsed) => !isCollapsed)}
                    />
                    <ActionButton color="primary" icon={<BarChartIcon />} />
                    <ActionButton 
                        color="secondary" 
                        icon={<DeleteIcon />} 
                        onClick={() => deleteItem(uuid)}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={isCollapsed} unmountOnExit>
                        <UpdateForm 
                            origin={origin}
                            endpoint={endpoint}
                            description={description}
                            uuid={uuid}
                            onUpdate={(uuid) => setCollapsed(false)}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default LinkItem;
