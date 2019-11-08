import React, { Component } from 'react'
import { fetchUser, fetchPosts } from '../utils/api'
import queryString from 'query-string'
import Display from './Display'
import Loading from './Loading'

export default class User extends Component {
    state = {
        data: {},
        error: null,
        loadingUser: true,
        loadingPosts: true,
        submitted: {},
        user: {}
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        this.retrieveUserInfo(id)
    }

    retrieveUserInfo = (id) => {
        fetchUser(id).then((user) => (
            this.setState({
                user,
                loadingUser: false,
                submitted: user.submitted.slice(0,50)
            })
        ))
        .then(() => fetchPosts(this.state.submitted))
            .then((data) => {
                this.setState({
                    data,
                    loadingPosts: false
                })
            }
        
        )
        .catch(() => {
            console.warn('Error fetching posts', error)
            this.setState({
                error: 'There was an error fetching posts'
            })
        })
            
        
    }


    render() {
        const { data, user, error, loadingUser, loadingPosts } = this.state
        return (
            <div>
                {loadingUser || loadingPosts && <Loading text="Loading"/>}
                {error && <p>Error</p>}
                {!loadingUser && <RenderUser user={user} />}               
                {!loadingPosts && data.map((data) => (
                    <Display data={data} key={data.id} />
                ))
            }
            </div>
        )
    }
}

class RenderUser extends Component {
    
    render() {
        const { id, created, karma } = this.props.user
        const dateObj = new Date(created * 1000)
        
        console.log("renderuser", this.props)
        return (
            <React.Fragment>
                <h2>{id}</h2>
                <p>joined {dateObj.toString().slice(0,25)} has {karma} karma </p>

            </React.Fragment>
        )
    }
}