import React from 'react'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const DateEditor = (props) => {

    const handleChange = (event)=>{
        props.onDataChange(event.target.value);
    }

    const data = props.source;

    return (
        <TextField
            id="outlined-multiline-flexible"
            label="Source Data Area"
            multiline
            rowsMax="400"
            rows="20"
            fullWidth={true}
            value={data}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
        />
    )

}

DateEditor.propTypes = {
    onDataChange: PropTypes.func,
    source: PropTypes.string
}
export default DateEditor