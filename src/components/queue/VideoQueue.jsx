import React from 'react';
import PropTypes from 'prop-types';
import Video from './video';
import AddToQueueForm from './AddToQueueForm';
import './videoQueue.css';
import * as socket from '../../actions/socket-actions'

class VideoQueue extends React.Component {
    constructor(props) {
        super(props);
        this.scrolled = this.scrolled.bind(this)
    }
    renderQueue() {
        return this.props.videos.map((video, key) => {
            return <li key={key} className="video-list-wrapper">
                <Video
                    thumbnail_url={video.thumbnailUrl}
                    author={video.author}
                    author_url={video.authorUrl}
                    video_url={video.URL}
                    title={video.title}
                />
            </li>
        })
    }

    scrolled() {
        const element = document.querySelector('.queue-list-wrapper')
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
            if(this.props.okayToMore) {
                this.props.getMoreHistory(this.props.videos[this.props.videos.length - 1]._id);
            }
        }
    }

    render() {
        return (
            <div className="queue-wrapper">
                <AddToQueueForm handleSubmit={this.props.addVideo} />
                <ul className="queue-list-wrapper" onScroll={this.scrolled}>
                    {this.renderQueue()}
                </ul>
            </div>
        )
    }
}

VideoQueue.propTypes = {
    videos: PropTypes.array,
    addVideo: PropTypes.func,
    getMoreHistory: PropTypes.func,
    okayToMore: PropTypes.bool
}

export default VideoQueue;