import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyBDNOqX-gY9XWtBJqbdpcmn1IYBU3Q50mQ';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [],
            selectdedVideo: null
        };
        this.videoSearch('canada');
    }

    videoSearch(term){
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectdedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectdedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                videos={this.state.videos} />
        </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));