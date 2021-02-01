import React from 'react';
import { connect } from 'react-redux';
import { getHistory, addVideo, getMoreHistory, gotNewVideo } from './actions/history-actions';
import VideoHistory from './components/history/VideoHistory'
import VideoPlayer from './components/player/VideoPlayer'
import * as socket from './requesters/sockets';
import "./app.css"

// Render a YouTube video player

class App extends React.Component {
    componentDidMount() {
        this.props.getHistory();

        // listen for add event
        socket.listenAdd( video => {
            let {videos} = this.props.history;

            if(videos) {
                videos.unshift(video);
                this.setState({videos: videos})
                this.props.gotNewVideo(video);
            }
        });
    }

    render() {
        let { history } = this.props;
        let videos = history.videos;
        return (
            <div className="App">
                <header className="App-header">{
                    history.loaded ? 
                    <div className="container">
                        <VideoPlayer url={videos[0].URL}/>
                        <VideoHistory 
                            videos={videos} 
                            addVideo={this.props.addVideo} 
                            getMoreHistory={this.props.getMoreHistory} 
                            okayToMore={this.props.history.lastMore !== 0}
                            moring={this.props.history.moring}
                        />
                    </div> : ''
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
        getMoreHistory: (id) => {
            return dispatch(getMoreHistory(id));
        },
        addVideo: (url) => {
            return dispatch(addVideo(url));
        },
        gotNewVideo: (video) => {
            return dispatch(gotNewVideo(video));
        }
    }
}

function mapStateToProps(state) {
    return {
        history: state.history
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
