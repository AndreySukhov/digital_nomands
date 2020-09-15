import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.module.css';

import { ReactComponent as Square } from '../../assets/images/nav/square.svg';
import { ReactComponent as Analytics } from '../../assets/images/nav/analytics.svg';
import { ReactComponent as Chat } from '../../assets/images/nav/chat.svg';
import { ReactComponent as Map } from '../../assets/images/nav/map.svg';
import { ReactComponent as Settings } from '../../assets/images/nav/settings.svg';
import { ReactComponent as Burger } from '../../assets/images/nav/burger.svg';

const Nav = () => {
    return (
        <nav className={style.nav}>
            <div className={style['burger-ctn']}>
                <button className={style['burger']}>
                    <Burger />
                </button>
            </div>
            <ul className={style['nav-list']}>
                <li className={style['nav-list-item']}>
                    <NavLink to='/' exact className={style['nav-list-link']}
                             activeClassName={style['nav-list-link--active']}>
                        <Square />
                    </NavLink>
                </li>
                <li className={style['nav-list-item']}>
                    <NavLink to='/analytics' className={style['nav-list-link']}
                             activeClassName={style['nav-list-link--active']}>
                        <Analytics />
                    </NavLink>
                </li>
                <li className={style['nav-list-item']}>
                    <NavLink to='/map' className={style['nav-list-link']}
                             activeClassName={style['nav-list-link--active']}>
                        <Map />
                    </NavLink>
                </li>
                <li className={style['nav-list-item']}>
                    <NavLink to='/chat' className={style['nav-list-link']}
                             activeClassName={style['nav-list-link--active']}>
                        <Chat />
                    </NavLink>
                </li>
                <li className={style['nav-list-item']}>
                    <NavLink to='/settings' className={style['nav-list-link']}
                             activeClassName={style['nav-list-link--active']}>
                        <Settings />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
