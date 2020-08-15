import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    img: {
        maxWidth: '250px'
    }
});

export default function Row(props) {
    const { row } = props;
    console.log(row);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    return (

        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th">
                    <img src={row.imgUrl} alt={`${row.name} image`} className={classes.img} />
                </TableCell>
                <TableCell component="th">
                    <Typography variant="h6">{row.name}</Typography>
                </TableCell>
                <TableCell>{row.group}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Homes
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Area (sqft)</TableCell>
                                        <TableCell>Total price ($)</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.homes.map((home, index) => (
                                        <React.Fragment>
                                            <TableRow key={home.id}>
                                                <TableCell component="th" scope="row">
                                                    {home.type}
                                                </TableCell>
                                                <TableCell>{home.area}</TableCell>
                                                <TableCell>{home.price}</TableCell>
                                            </TableRow>

                                        </React.Fragment>
                                    ))}
                                    <TableRow>

                                        <TableCell><Typography variant="h6">Average ($)</Typography></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><Typography variant="h6">{row.homes.average}</Typography></TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}