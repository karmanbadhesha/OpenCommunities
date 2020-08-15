import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HouseIcon from '@material-ui/icons/House';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',

        },
    },
    img: {
        maxWidth: '300px',
        ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
            width: '100px'
        }
    }
});

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();


    return (

        <React.Fragment>
            <TableRow className={classes.root} onClick={() => setOpen(!open)}>
                {/* only render drop down icon for communities that have houses */}
                {row.homes.length > 0 ?
                    <TableCell>
                        <IconButton aria-label="expand row" size="medium"
                            style={{
                                backgroundColor: '#009999'
                            }} >
                            {open ? <KeyboardArrowUpIcon /> : <HouseIcon />}
                        </IconButton>
                    </TableCell>
                    : <TableCell></TableCell>
                }

                <TableCell component="th">
                    <img src={row.imgUrl} alt={row.name} className={classes.img} />
                </TableCell>
                <TableCell component="th" >
                    <Typography variant="h6">{row.name}</Typography>
                </TableCell>
                <TableCell >{row.group}</TableCell>
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
                                        <TableCell><Typography variant="h6">Type</Typography></TableCell>
                                        <TableCell><Typography variant="h6">Area (sqft)</Typography></TableCell>
                                        <TableCell><Typography variant="h6">Total price ($)</Typography></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.homes.map((home, index) => (
                                        // list each home
                                        <React.Fragment key={index}>
                                            <TableRow key={home.id}>
                                                <TableCell component="th" scope="row">
                                                    {home.type}
                                                </TableCell>
                                                <TableCell>{home.area}</TableCell>
                                                <TableCell>{home.price}</TableCell>
                                            </TableRow>

                                        </React.Fragment>
                                    ))}
                                    <TableRow key={row.homes.average}>
                                        {/* average row  */}
                                        <TableCell><Typography variant="h6">{row.homes.average > 0 ? `Average($)` : null}</Typography></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><Typography variant="h6">{row.homes.average > 0 ? row.homes.average : null}</Typography></TableCell>

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