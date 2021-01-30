import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as socket from '../../requesters/sockets';
import { 
    playVideo, 
    reinitialize, 
    pauseVideo, 
    seekVideo, 
    getPlayerState, 
    getPlayer, 
    gotPlayEvent,
    gotPauseEvent
} from '../../actions/player-actions';
import ReactPlayer from 'react-player'
import './videoPlayer.css'
import { Socket } from 'socket.io-client';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasSynced: false, syncing: false }
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.getPlayerTime = this.getPlayerTime.bind(this);
        this.getInternalPlayer = this.getInternalPlayer.bind(this);
    }

    componentDidMount() {
        //socket.listenPlayerState(this.props.getPlayerState)
        socket.listenPlay(this.props.gotPlayEvent);
        socket.listenPause(this.props.gotPauseEvent);
        this.props.getPlayer();
    }

    ref = player => {
        this.player = player;
    }

    onPlay() {
        // first time user clicks play, get player from server
        if (this.getPlayerTime() !== this.props.player.time) {
            this.props.getPlayer()
            // user has already engaged the player, start playing from the server
        } else if (!this.player.loading) {
            this.props.getPlay(this.props.player)
        }
    }

    onPause() {
        if (!this.player.postingPause) {
            this.props.pauseVideo({ playing: false, time: this.player.getCurrentTime() });
        }
    }

    getInternalPlayer() {
        if (this.player) {
            if (this.player.getInternalPlayer) {
                return this.player.getInternalPlayer();
            }
        }
        return undefined;
    }

    onSeek(seconds) {
        if (!this.player.postingSeek) {
            this.props.seekVideo({ playing: true, time: seconds });
        }
    }

    getPlayerTime() {
        if (this.player) {
            return Math.round(this.player.getCurrentTime());
        }
    }

    render() {
        if (this.props.player.started && this.player && this.getPlayerTime() === 0) {
            if (this.props.player.time !== this.getPlayerTime()) {
                this.player.seekTo(this.props.player.time);
                if (this.player && this.player.getInternalPlayer && this.player.getInternalPlayer.playVideo && this.props.player.playing) {
                    this.player.getInternalPlayer().playVideo();
                }
            }
        }
        return (
            <div className="player-wrapper" >
                <ReactPlayer
                    ref={this.ref}
                    url={this.props.url}
                    playing={this.props.player.playing}
                    controls={true}
                    playsinline={true}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onSeek={() => {
                        console.log("seek????????????")
                    }}
                    onEnded={socket.emitEnd}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                                enablejsapi: 1,
                                modestbranding: 1,
                                rel: 0
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
        getPlay: (player) => {
            return dispatch(playVideo(player));
        },
        pauseVideo: (player) => {
            return dispatch(pauseVideo(player));
        },
        seekVideo: (player) => {
            return dispatch(seekVideo(player));
        },
        getPlayerState: (player) => {
            return dispatch(getPlayerState(player))
        },
        getPlayer: () => {
            return dispatch(getPlayer());
        },
        gotPlayEvent: (player) => {
            return dispatch(gotPlayEvent(player));
        },
        gotPauseEvent: (player) => {
            return dispatch(gotPauseEvent(player));
        },
        reinit: () => {
            return dispatch(reinitialize());
        }
    }
}

function mapStateToProps(state) {
    return {
        player: state.player
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);