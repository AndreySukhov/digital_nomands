import React from 'react';

import style from './header.module.css'

const Header = () => {
        return (
            <header className={style.wrap}>
                <div className="row">
                    <div className={style.label}>
                        Эмоциональный индекс
                    </div>
                </div>
            </header>
        )
}

export default Header;
