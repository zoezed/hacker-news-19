import React, { Component } from 'react'
import { getNews } from '../utils/api'
import Display from './Display'

export default class Top extends Component {   
    state = {
        data: {},
        error: null
    }

    componentDidMount() {
        this.retrieveNews()
    }

    retrieveNews = () => {
        const item = 'topstories'
        getNews(item).then((data) => (
            this.setState({
                data
            })
        ))
        .catch(() => {
                console.warn('Error fetching news')
                this.setState({
                    error: 'There was an error fetching news'
                })
        })      
    }
    
    isLoading = () => {
        const { data, error } = this.state

        return !data[0] && error === null
    }
    
    render() {
        const { error, data } = this.state
        
        return (
            <div>
                {this.isLoading() && <div>Loading</div>}    
                {error && <p>Error</p>}
                {data[0] && data.map((newsItem) => (
                   
                    <Display data={newsItem} key={newsItem.id} />
                ))
                }            
            </div>
            
        )
    }
}
