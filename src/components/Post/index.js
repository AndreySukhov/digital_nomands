import React, { useState, Fragment } from 'react';

import { highlightText } from '../../utils'

import style from './style.module.css';

import { ReactComponent as ChevronDown } from '../../assets/images/chevron-down.svg';
import { ReactComponent as Clock } from '../../assets/images/clock.svg';
import img1 from '../../assets/emotions/1.jpg';
import img2 from '../../assets/emotions/2.jpg';
import img3 from '../../assets/emotions/3.jpg';
import img4 from '../../assets/emotions/4.jpg';
import img5 from '../../assets/emotions/5.jpg';
import img6 from '../../assets/emotions/6.jpg';
import user from '../../assets/images/user.svg';
import defaultAvatar from './default-avatar.svg';

const imgConfig = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
};

const Post = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={style.post} onClick={() => {
            setIsOpen(!isOpen);
        }}>
            {isOpen ? <Fragment>
                <div className={style.header}>
                    <div className={style['header-author']}>
                        <div className={style['header-author-img']}>
                            <img src={defaultAvatar} alt=""/>
                        </div>
                    </div>
                    <div className={style['header-details-opened']}>
                        <div className={style['author']}>
                            @{props.author}
                            <div className={style['date']}>
                                {props.date}
                            </div>
                        </div>
                        <div className={style['likes']}>
                            {props.likes}
                        </div>

                    </div>

                </div>
                <div className={`${style.body} ${style['body-opened']}`}>
                    <div>
                        <div className={style.text}
                             dangerouslySetInnerHTML={{__html: highlightText(props.text, props.keywords)}} />
                    </div>
                    <div>
                        <div className={style['emotions-list']}>
                            {props.emotions.map(({percantage, type}, ) => {
                                return (
                                    <div key={type} className={style['emotion-item']}>
                                        {percantage} <img src={imgConfig[type]} alt=""/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style['footer-date']}>
                        <Clock /> {props.date}
                    </div>
                    <div className={style['footer-likes']}>
                        <span className={style['footer-likes-text']}>{props.likes}</span>
                        like
                    </div>
                </div>
            </Fragment> : <Fragment>
                <div className={style.header}>
                    <div className={style['header-author']}>
                        <div className={style['header-author-img']}>
                            <img src={defaultAvatar} alt=""/>
                        </div>
                    </div>
                    <div className={style['header-details']}>
                        <div className={style['author']}>
                            @{props.author}
                        </div>
                        <div className={style['date']}>
                            <div className={`${style.text} ${style['text--collapsed']}`}>
                                {props.text}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>}
        </div>
    );
};

export default Post;
