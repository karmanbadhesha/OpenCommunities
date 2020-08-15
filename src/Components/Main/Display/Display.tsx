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
import Row from '../Row';

const useStyles = makeStyles({
    button: {
        margin: '15px',
    }
});

export default function Display() {

    const [communities, setCommunities] = React.useState([]);
    const [homes, setHomes] = React.useState([]);
    const [updated, setUpdated] = React.useState([]);
    const classes = useStyles();


    useEffect(() => {
        //after communities are loaded, fetch all homes
        async function loadHouses() {
            const homeUrl = 'https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes';
            await axios.get(homeUrl)
                .then(response => {
                    setHomes(response.data);
                }).catch(err => {
                    console.log(err)
                })
        }
        loadHouses();
    }, [communities])


    useEffect(() => {
        setUpdated(communities);
        //update list of communities and add homes to them
        communities.forEach(function (community, index) {
            let matchingRows: string[] = [];
            let count = 0;
            let avg = 0;
            homes.forEach(home => {
                if (community.id === home.communityId) {
                    //find all homes that reside in each community
                    matchingRows.push(home);

                    //calculate average
                    avg += home.price;
                    count++;

                }
            })

            avg = avg / count;
            console.log(`AVG for ${community.name} is ${avg}`);
            let copy = [...communities]; //copy old data
            copy[index].homes = matchingRows; //insert matching homes
            copy[index].homes.average = avg; //insert avg price for each community
            setUpdated(copy);  //replace old data
        });
    }, [homes])

    return (
        <React.Fragment>
            <Button
                variant="contained"
                className={classes.button}
                style={{
                    backgroundColor: '#009999'
                }} onClick={async () => {
                    const communitiesUrl = 'https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities';
                    await axios.get(communitiesUrl)
                        .then(response => {
                            setCommunities(response.data);
                        }).catch(err => {
                            console.log(err)
                        })
                }}>Load data</Button>
            <Button
                variant="contained"
                className={classes.button}
                style={{
                    backgroundColor: '#e47b2d'
                }}
                onClick={() => {
                    setUpdated([]);
                }}>Clear</Button>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Image </TableCell>
                            <TableCell>Community Name</TableCell>
                            <TableCell>Group</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {updated.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
