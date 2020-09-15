import React from 'react';

import worldGeoJSON from "../../pages/Map/geo.json";
import style from './header.module.css'

import notification from '../../assets/images/notifications.svg'
import user from '../../assets/images/user.svg'

import { DistrictContext } from '../../App'

const DISTRICTS = worldGeoJSON.features.map(({properties}) => properties.name)
const Header = () => {
        return (
            <header>
                <div className="row">
                    <div className={style.wrap}>
                        <div className={style.label}>
                            Эмоциональный индекс
                        </div>

                        <div className={style['select-wrap']}>
                            <DistrictContext.Consumer>
                                {({setDistrict}) => {
                                    return (
                                        <select className={style['select']} onChange={(e) => {
                                            setDistrict(e.target.value)

                                        }}>
                                            {DISTRICTS.map((district) => {
                                                return <option value={district} key={district}>{district}</option>
                                            })}
                                        </select>
                                    )

                                }}
                            </DistrictContext.Consumer>

                        </div>

                        <div className={style['icons']}>
                            <div className={style['icon-item']}>
                                <img src={notification} alt=""/>
                            </div>
                            <div className={style['icon-item']}>
                                <img src={user} alt=""/>
                            </div>
                        </div>

                    </div>

                </div>
            </header>
        )
}

export default Header;
