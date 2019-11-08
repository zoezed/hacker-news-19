import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Display extends Component {
    state = {
        commNo: 0
    }

    componentDidMount() {
        const { kids } = this.props.data
    
        if (kids) {
            this.setState({
                commNo:kids.length
            })
        }
           }
    render() {
       
        const { url, id, by, time } = this.props.data
        const dateObj = new Date(time * 1000)  
        
        return (
            <React.Fragment>
                <ul>
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
                                &nbsp;on {dateObj.toString().slice(0, 25)}</li>
                            <li>with &nbsp;
                                <Link
                                    to={{
                                        pathname: 'post',
                                        search: `?id=${id}`
                                    }}>
                                    {this.state.commNo} comments
                                </Link>
                            </li>
                        </ul>
                    </li>    
                </ul>
            </React.Fragment>
        )
    }

}

Display.propTypes = {
    data: PropTypes.object.isRequired
}