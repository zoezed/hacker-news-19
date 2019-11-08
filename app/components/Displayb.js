import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Display extends Component {
    render() {
        const { data } = this.props
        console.log("in display", this.props)
        return (
            <React.Fragment>
                <ul>
                    {data.map((newsItem) => {
                        const { url, id, by, time, kids } = newsItem
                        const dateObj = new Date(time * 1000)                       
                        
                        return (
                            <li className='display-li' key={id}>
                                <ul>
                                    <li><a href={url}>{url}</a></li>
                                    <li>by 
                                        <Link
                                            to={{
                                                pathname: 'user',
                                                search: `?id=${by} `
                                            }}> {by}
                                        </Link>
                                        on {dateObj.toString().slice(0, 25)}</li>
                                    <li>with
                                        <Link
                                            to={{
                                                pathname: 'post',
                                                search: `?id=${id}`
                                            }}>
                                            comments
                                        </Link>
                                    </li>
                                </ul>
                            </li>                            
                        )

                    })}
                </ul>
            </React.Fragment>
        )
    }

}
