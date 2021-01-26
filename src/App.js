import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getHistory, addVideo } from './actions/actions';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Video from './components/queue/video';
import VideoQueue from './components/queue/VideoQueue'
import * as socket from './actions/socket-actions';

class App extends React.Component {
    componentDidMount() {
        this.props.getHistory();

        // listen for add event
        socket.listenAdd( video => {
            let {videos} = this.props.history;

            if(videos) {
                videos.unshift(video);
                this.setState({videos: videos})
            }
        });
    }

    render() {
        let { history } = this.props;
        let videos = history.videos;
        return (
            <div className="App">
                <header className="App-header">{
                    history.loaded ? <VideoQueue videos={videos} addVideo={this.props.addVideo} /> : ''
                }
                </header>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getHistory: () => {
            return dispatch(getHistory());
        },
        addVideo: (url) => {
            return dispatch(addVideo(url));
        }
    }
}

function mapStateToProps(state) {
    return {
        history: state.history,
        addVideo: state.addVideo
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
