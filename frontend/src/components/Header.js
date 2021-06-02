import React from 'react';
import { Button } from 'antd';
import './Header.css';
import { Button as BB } from 'react-bootstrap';

const Header = () => (
    <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    Hello Deshi!!!!
                    <Button type="primary">Primary Button</Button>
                    <BB>Hello</BB>
                </a>
            </div>
        </nav>
    </header>
)

export default Header;