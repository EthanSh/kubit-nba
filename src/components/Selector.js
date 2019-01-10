import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

const Selector = (props)=>{

    const status = props.status

    const handleChange = (e)=>{
        props.handleChange(e.target.value)
    }

    return (
        <FormControl>
            <InputLabel htmlFor="status">Type</InputLabel>
            <Select
                value={status}
                onChange={handleChange}
                inputProps={{
                    name: 'status',
                    id: 'status',
                }}
            >
                <MenuItem value="all">ALL</MenuItem>
                <MenuItem value="visit">VISIT</MenuItem>
                <MenuItem value="home">HOME</MenuItem>
            </Select>
        </FormControl>
    )
}

Selector.propTypes = {
    status: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Selector;