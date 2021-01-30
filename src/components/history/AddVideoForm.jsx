import React from 'react';
import PropTypes from 'prop-types'
import './addVideoForm.css'
import * as socket from '../../requesters/sockets'

class AddVideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: ''};
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    handleSubmit() {
        //do url check here
        let re = /https?:\/\/(www\.)?youtu/;
        if(this.state.url.match(re)) {
            this.props.handleSubmit(this.state.url);
        }
    }

    handleKey = e => {
        if(e.keyCode === 13) {
            this.handleSubmit();
        }
    }    

    render() {
        return (
            <div className="form-wrapper">
                <label className="form-label">Add video:</label>
                <div className="form-field-url">
                    <input 
                        name="url" 
                        type="text" 
                        className="form-field-url"
                        onChange={this.handleChange}
                        placeholder="https://www.youtube.com/watch?v=ZzcA_G5ujGk"
                        onKeyDown={this.handleKey}
                    />
                </div>
                <div className="form-submit-wrapper">
                    <button className="form-submit" type="button" onClick={this.props.handleSubmit}>Submit</button>
                </div>
            </div>
        )
        
    }
}

AddVideoForm.propTypes = {
    handleSubmit: PropTypes.func
}

export default AddVideoForm;