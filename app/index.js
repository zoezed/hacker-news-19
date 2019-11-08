import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Top from './components/Top'
import User from './components/User'
import Nav from './components/Nav'
import Post from './components/Post'
import { ThemeProvider } from './contexts/theme'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <Switch>
                                <Route exact path='/' component={Top} />
                                <Route path='/user' component={User} />
                                <Route path='/post' component={Post} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('app')
)