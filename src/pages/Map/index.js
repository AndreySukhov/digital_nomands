import React, { useState, useCallback } from 'react';

import Post from '../../components/Post';
import MapComponent from './MapComponent';

import { getRandomInt } from '../../utils';
import worldGeoJSON from "./geo.json";

import style from './style.module.css';
import emotionsList from '../../assets/emotions/list.jpg';

import { EMOTION_OPTIONS, DUMB_POSTS, AREA_COLOR_CONFIG } from './utils';
import { createRandomNum } from '../../utils';
import { DistrictContext } from '../../App'
import Preloader from "../../components/Preloader";

const worldGeoJSONCopy = {
    ...worldGeoJSON,
    features: worldGeoJSON.features.map((feature) => {
        return {
            ...feature,
            properties: {
                ...feature.properties,
                fillColor: `#${AREA_COLOR_CONFIG[createRandomNum(1,8)]}`
            }
        };
    })
};

const Map = () => {


    const [postsLimit, setPostsLimit] = useState(3);
    const [currentDistrict, setCurrentDistrict] = useState('');
    const [socialFilter, setSocialFilter] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFilter = useCallback((newVal, socialFilter) => {

        setLoading(true)

        setTimeout(() => {
            if (socialFilter === newVal) {
                setSocialFilter(null);
            } else {
                setSocialFilter(newVal);
            }
            setLoading(false)
        }, createRandomNum(300,400))


    }, []);

    return (
        <div className={style.wrap}>
            <div className={style.controls}>
                <div className={style.tags}>
                    {EMOTION_OPTIONS.map(({name, body}) => {
                        return (
                            <button key={name}
                                    onClick={() => {
                                        setCurrentDistrict(worldGeoJSONCopy.features[getRandomInt(0, worldGeoJSONCopy.features.length)].properties.name)
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
                <DistrictContext.Consumer>
                    {(context) => {
                        return (
                            <MapComponent
                                json={worldGeoJSONCopy}
                                onClear={() => {
                                    setCurrentDistrict('');
                                }}
                                context={context}
                                currentDistrict={currentDistrict}/>
                        );
                    }}
                </DistrictContext.Consumer>
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
                        <button className={`${style['social-link']} ${style['social-link--green']}`}
                                onClick={() => {handleFilter('ta', socialFilter)}}
                        >
                            Tripadviser
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
                    {loading && (
                        <div style={{margin: '0 auto'}}>
                            <Preloader />
                        </div>
                    )}
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
