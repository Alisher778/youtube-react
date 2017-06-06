import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'lodash'; 

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {searchTerm: "", videos: []}
	}

	componentDidMount() {
		$.get('https://www.googleapis.com/youtube/v3/search',{
				
                part: 'snippet',
				q: this.state.searchTerm,
				key: 'AIzaSyB1-QWxSguLbj9fvB3ha6YKTXAmLJRLNOA',
				order: 'rating',
				'maxResults': '15',
				autoplay: 1,
			}).then(function(data){
				
				this.setState({videos: data.items});
			}.bind(this)
			);
	}


	onChange(e){
		let value = e.target.value;
		this.setState({searchTerm: value});
		setTimeout(()=>{
			$.get('https://www.googleapis.com/youtube/v3/search',{
				
                part: 'snippet',
				q: this.state.searchTerm,
				key: 'AIzaSyB1-QWxSguLbj9fvB3ha6YKTXAmLJRLNOA',
				order: 'rating',
				'maxResults': '15',
				autoplay: 1,
			}).then(function(data){
				this.setState({videos: data.items});
			}.bind(this));
		
		}, 500)
	}
	
	render() {
		const videoResults = this.state.videos;
		console.log(videoResults)
		return (

				<div className="container-fluid">
					<nav className="navbar navbar-default">
						<input type="search"  onChange={this.onChange.bind(this)} defaultValue={this.state.searchTerm} className="search"/>
					</nav>
					<div class="container">
						<ul id="results" className="list-group">
						{videoResults.map((video, i)=> {
							if(video.id.playlistId){
								return <li key={i} className="list-group-item"><iframe src={`https://www.youtube.com/embed/videoseries?list=${video.id.playlistId}`}></iframe></li>
							}else{
								return <li key={i} className="list-group-item">
											<div className="media-left">
												<iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} className="media-object embed-responsive-item"></iframe>
											</div>
											<div className="media-body">
    											<h4 className="media-heading">{video.snippet.title}</h4>
 												<a href="#">{video.snippet.channelTitle}</a>
 												<p>{video.snippet.description}</p>
  											</div>
										</li>
							}
							
						})
						}
					</ul>
					</div>
					
				</div>
			)
	}
}