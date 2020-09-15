import React, { useState, useEffect } from 'react';
import {createRandomNum} from "../../utils";
import style from './style.module.css';
import Preloader from "../../components/Preloader";


const Modal = ({modalData, onClose}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, createRandomNum(300,400))

    }, [modalData?.name])

    if (loading) {
        return (
            <div className={style.modal}>
                <div className={style['modal-header-wrap']}>
                    <div className={style['modal-header']}>
                        <div style={{margin: '0 auto'}}>
                            <Preloader />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={style.modal}>
            <div className={style['modal-header-wrap']}>

                <div className={style['modal-header']}>
                    <div className={style['modal-title']}>
                        {modalData.name}
                    </div>
                    <button className={style['modal-close']} onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className={style['modal-hours-line']}>
                    {Array(24).fill(1).map((el, i) => {
                        return <div key={i} className={`${style['modal-hours-line__item']} bg-${createRandomNum(1,6)}`}/>
                    })}
                </div>
                <div className={style['modal-hours-line-legend']}>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        0
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        4
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        8
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        12
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        16
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        20
                    </div>
                    <div className={`${style['modal-hours-line-legend__item']}`}>
                        24
                    </div>
                </div>
            </div>
            <div className={style['modal-body']}>
                <div className={style['modal-days-grid']}>
                    {Array(30).fill(1).map((el, i) => {
                        return <div key={i} className={`${style['modal-days-grid__item']} bg-${createRandomNum(1,6)}`}/>
                    })}
                </div>
                <div className={style['modal-posts']}>
                    <span className={style['modal-posts-num']}>{modalData.posts}</span> posts
                </div>
            </div>

        </div>
    )
}

export default Modal
