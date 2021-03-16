import React, { Component, FormEvent, useEffect } from 'react';
import { Router, withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { toSeoText, unSeoText } from '../../utils/seo-tools';
import Paths from '../../paths';
import { browser } from 'node:process';

class StreamPlayButton extends Component {

    state = {
        play: false
    }

    audio: HTMLAudioElement | undefined;

    constructor(props: any) {
        super(props);
        if (process.browser) {
            this.audio = new Audio(props.streamUrl);
        }
    }


    componentDidMount() {
        if (!this.audio) {
            return;
        }
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        if (!this.audio) {
            return;
        }
        this.audio.pause();
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));

    }

    togglePlay = () => {
        if (!this.audio) {
            return;
        }
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this?.audio?.play() : this?.audio?.pause();
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.togglePlay} className="p-1 hover:bg-green-500 group focus:outline-none">
                    {this.state.play ? (
                        <svg className="w-8 h-8 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}

                </button>
            </div>
        );
    }

}

export default StreamPlayButton;