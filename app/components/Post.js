import React, { Component } from 'react'
import Display from './Display'
import queryString from 'query-string'
import { fetchItem, fetchComments } from '../utils/api'

export default class Post extends Component {
    state = {
        loadingPost: true,
        loadingComments: true,
        commentIds: [],
        comments: {},
        postInfo: {},
        error: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        console.log(id)
        this.retrievePostInfo(id)
    }

    retrievePostInfo(id) {
        fetchItem(id).then((res) => {
            this.setState({
                loadingPost: false,
                postInfo: res,
                commentIds: res.kids || []
            })
        })
            .then(() => fetchComments(this.state.commentIds)
                .then((data) => {
                    this.setState({
                        loadingComments: false,
                        comments: data
                    })
                })
            
        )

    }

    render() {
        const { loadingPost, loadingComments, comments, postInfo } = this.state
        
        return (
            <div>
                {!loadingPost && <h1>{postInfo.title}</h1>}
                {!loadingPost && <Display data={postInfo} />}
                {!loadingComments && <ShowComments info={comments}/>}
            </div>
        )
    }
}

class ShowComments extends Component {
    render() {
        const {info } = this.props
           
        return (
            <React.Fragment>
                <ul>
                    {info.map((item) => {
                        const { text, id, by, time } = item
                        const dateObj = new Date(time * 1000)     
                        return (
                            
                            <li className='comments  display-li' key={id}>
                                by {by} on {dateObj.toString().slice(0,25)}
                            <p dangerouslySetInnerHTML={{__html: text}}/>    
                            </li>
                        )

                    })}
                </ul>

            </React.Fragment>
        )
    }
}