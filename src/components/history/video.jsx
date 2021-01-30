import React from 'react';
import PropTypes from 'prop-types'
import './videos.css'

class Video extends React.Component {
    render() {
        return (
            <>
                <div className="video-thumbnail-wrapper">
                    <img src={this.props.thumbnail_url} className="video-thumbnail" />
                </div>
                <ul className="video-descriptors-wrapper">
                    <li>
                        <a href={this.props.video_url} className="video-link link-title">{this.props.title}</a>
                    </li>
                    <li>
                        <a href={this.props.author_url} className="video-link link-author">{this.props.author}</a>
                    </li>
                </ul>
            </>
        );
    }
}

Video.propTypes = {
    thumbnail_url: PropTypes.string,
    author: PropTypes.string,
    author_url: PropTypes.string,
    video_url: PropTypes.string,
    title: PropTypes.string
}

export default Video;