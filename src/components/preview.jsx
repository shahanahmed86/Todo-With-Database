import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '50%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'hidden',
    },
    table: {
        minWidth: 400,
    },
});

// let id = 0;
// function createData(Todo, Edit, Delete) {
//     id += 1;
//     return { id, Todo, Edit, Delete };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

class SimpleTable extends Component {
    render() {
        const { classes } = this.props;
        const { data, onEdit, onDelete } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Todos</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, ind) => {
                            return (
                                <TableRow key={ind}>
                                    <TableCell component="th" scope="row">
                                        {row.message}
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper >
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);