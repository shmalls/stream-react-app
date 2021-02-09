import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as socket from '../../requesters/sockets';
import { 
    playVideo, 
    pauseVideo, 
    getPlayer, 
    gotPlayEvent,
    gotPauseEvent,
} from '../../actions/player-actions';
import ReactPlayer from 'react-player'
import './videoPlayer.css'
import { Socket } from 'socket.io-client';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: false}
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.getPlayerTime = this.getPlayerTime.bind(this);
        this.getInternalPlayer = this.getInternalPlayer.bind(this);
        this.seekPlayer = this.seekPlayer.bind(this);
    }

    componentDidMount() {
        //socket.listenPlayerState(this.props.getPlayerState)
        socket.listenPlay((data)=> {
            this.props.gotPlayEvent(data)
            this.player.seekTo(this.props.player.time);
            this.setState({playing:true});
        });
        socket.listenPause((data) => {
            this.props.gotPauseEvent(data)
            this.player.seekTo(this.props.player.time);
            this.setState({playing:false});
        });
        this.props.getPlayer();
    }

    ref = player => {
        this.player = player;
    }

    onPlay() {
        this.props.getPlay({ ...this.props.player, playing: true, time: Math.round(this.player.getCurrentTime()) }, this.props.socketEvents.events)
    }

    onPause() {
        this.props.pauseVideo({ ...this.props.player, playing: false, time: Math.round(this.player.getCurrentTime()) }, this.props.socketEvents.events);
    }

    getInternalPlayer() {
        if (this.player) {
            if (this.player.getInternalPlayer) {
                return this.player.getInternalPlayer();
            }
        }
        return undefined;
    }

    getPlayerTime() {
        if (this.player) {
            return this.player.getCurrentTime();
        }
    }

    seekPlayer() {
        if(this.player) {
            this.player.seekTo(this.props.player.time);
        }
    }



    render() {
        if (this.player && this.props.player.time !== this.getPlayerTime()) {
            if(Math.abs(this.props.player.time - this.getPlayerTime())>2) {
                this.player.seekTo(this.props.player.time);
            }
            if (this.player && this.player.getInternalPlayer && this.player.getInternalPlayer.playVideo && this.props.player.playing) {
                this.player.getInternalPlayer().playVideo();
            }
        }
        return (
            <div className="player-wrapper" >
                <ReactPlayer
                    ref={this.ref}
                    url={this.props.url}
                    playing={this.state.playing}
                    controls={true}
                    playsinline={true}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnded={socket.emitEnd}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                                enablejsapi: 1,
                                modestbranding: 1,
                                rel: 0,
                                disablekb: 1
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

VideoPlayer.propTypes = {
    url: PropTypes.string,
}

function mapDispatchToProps(dispatch) {
    return {
        getPlay: (player, events) => {
            return dispatch(playVideo(player, events));
        },
        pauseVideo: (player, events) => {
            return dispatch(pauseVideo(player, events));
        },
        getPlayer: () => {
            return dispatch(getPlayer());
        },
        gotPlayEvent: (player) => {
            return dispatch(gotPlayEvent(player));
        },
        gotPauseEvent: (player) => {
            return dispatch(gotPauseEvent(player));
        }
    }
}

function mapStateToProps(state) {
    return {
        player: state.player,
        socketEvents: state.socketEvents
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);