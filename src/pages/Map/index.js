import React, { useState, useCallback } from 'react';

import Post from '../../components/Post';
import MapComponent from './MapComponent';

import { getRandomInt } from '../../utils';
import worldGeoJSON from "./geo.json";

import style from './style.module.css';
import emotionsList from '../../assets/emotions/list.jpg';

import { EMOTION_OPTIONS, DUMB_POSTS } from './utils';

const Map = () => {


    const [postsLimit, setPostsLimit] = useState(3);
    const [currentDistrict, setCurrentDistrict] = useState('');
    const [socialFilter, setSocialFilter] = useState(null);

    const handleFilter = useCallback((newVal, socialFilter) => {
        if (socialFilter === newVal) {
            setSocialFilter(null);
        } else {
            setSocialFilter(newVal);
        }

    }, []);

    return (
        <div className={style.wrap}>
            <div className={style.controls}>
                <div className={style.tags}>
                    {EMOTION_OPTIONS.map(({name, body}) => {
                        return (
                            <button key={name}
                                    onClick={() => {
                                        setCurrentDistrict(worldGeoJSON.features[getRandomInt(0, worldGeoJSON.features.length)].properties.name)
                                    }}
                                    className={style['tag-body']}>
                                {body} {name}
                            </button>
                        );
                    })}
                </div>
                <div>
                    <div className={style['emotions']}>
                        <img src={emotionsList} alt=""/>
                    </div>
                    <div className={style['emotions-text']}>
                        Эмоциональная шкала
                    </div>
                </div>
            </div>
            <div className={style.map}>
                <MapComponent
                    onClear={() => {
                        setCurrentDistrict('');
                    }}
                    currentDistrict={currentDistrict}/>
            </div>

            <div className={style['sidebar-wrap']}>
                <div className={style.sidebar}>
                    <div className={style.socials}>
                        <button className={`${style['social-link']} ${style['social-link--red']}`}
                            onClick={() => {handleFilter('insta', socialFilter)}}
                        >
                           instagram
                        </button>
                        <button className={`${style['social-link']}`}
                                onClick={() => {handleFilter('fb', socialFilter)}}
                        >
                            vkontakte
                        </button>
                    </div>
                    <div className={style['sidebar-content']}>
                        {DUMB_POSTS.filter(({type}, i) => {
                            let isCurrentType = !socialFilter || type === socialFilter;
                            return i < postsLimit && isCurrentType
                        }).map((post, i) => {
                            return (
                                <div className={style.post} key={i}>
                                    <Post {...post}  />
                                </div>
                            );
                        })}
                    </div>
                    {postsLimit < DUMB_POSTS.length && (
                        <div className={style['more-wrap']}>
                            <button className={style['more-btn']} onClick={() => {
                                setPostsLimit(postsLimit + 2);
                            }}>
                                ...
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Map;
