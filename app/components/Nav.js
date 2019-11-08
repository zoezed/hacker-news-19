import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'
import { FaLightbulb } from 'react-icons/fa'
import { IoIosFlashlight } from 'react-icons/io'

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink
                                to='/'
                                className='nav-link'
                                exact >
                                    Top

                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='new'
                                className='nav-link'>
                                    New
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        className='btn-clear'
                        style={{ fontSize: 30 }}
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? <IoIosFlashlight size='22' /> : <FaLightbulb color='#fff' size='22'/>}
                        
                    </button>    
                </nav>
            )}            
        </ThemeConsumer>
    )
}