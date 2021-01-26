import React from 'react';
import PropTypes from 'prop-types';
import Video from './video';
import AddToQueueForm from './AddToQueueForm';
import './videoQueue.css';
import * as socket from '../../actions/socket-actions'

class VideoQueue extends React.Component {
    renderQueue() {
        return this.props.videos.map((video,key)=>{
            return <li key={key} className="video-list-wrapper">
                    <Video 
                        thumbnail_url={video.thumbnailUrl}
                        author={video.author}
                        author_url={video.authorUrl}
                        video_url={video.URL}
                        title={video.title}
                    />
                  </li>})
    }
    render() {
        return (
            <div className="queue-wrapper">
                <AddToQueueForm handleSubmit={this.props.addVideo} />
                <ul className="queue-list-wrapper">
                    {this.renderQueue()}
                </ul>
            </div>
        )
    }
}

VideoQueue.propTypes = {
    videos: PropTypes.array,
    addVideo: PropTypes.func
}

export default VideoQueue;