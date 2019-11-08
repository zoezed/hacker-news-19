import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Nav from './components/Nav'
import Loading from './components/Loading'
import { ThemeProvider } from './contexts/theme'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Top = React.lazy(() => import('./components/Top'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

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
                            <React.Suspense fallback={<Loading />} >
                                <Switch>
                                    <Route exact path='/' component={Top} />
                                    <Route path='/user' component={User} />
                                    <Route path='/post' component={Post} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>                        
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