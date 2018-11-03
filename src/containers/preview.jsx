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
        width: 'fit-content',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
    },
    table: {
        minWidth: '100%',
    },
    alignButton: {
        marginLeft: 4,
    }
});

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
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, ind) => {
                            return (
                                <TableRow key={ind}>
                                    <TableCell
                                        component="th" scope="row">
                                        {row.message}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => onEdit(row.key, ind)}
                                            size='small'
                                            color='primary'
                                            variant='contained' >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => onDelete(row.key, ind)}
                                            className={classes.alignButton}
                                            size='small'
                                            color='secondary'
                                            variant='contained' >
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