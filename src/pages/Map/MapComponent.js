import React, { Component, Fragment } from 'react';
import {GeoJSON, Map as LeafletMap} from "react-leaflet";

import { createRandomNum } from "../../utils";

import style from './style.module.css';
import worldGeoJSON from "./geo.json";

class MapComponent extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currentDistrict: null,
            modalData: null
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.currentDistrict !== this.props.currentDistrict) {
            this.setState({
                currentDistrict: this.props.currentDistrict
            })
        }

    }

    clickToFeature = (e) => {

        this.props.onClear()
        const layer = e.target;

        this.setState({
            currentDistrict: layer.feature.properties.name,
            modalData: {
                posts: createRandomNum(10, 40),
                name: layer.feature.properties.name,
            }
        })
    }

    style = (feature) => {

        const { currentDistrict } = this.state

        if (currentDistrict === feature.properties.name) {
            return {
                fillColor: '#774c3c',
                weight: 1,
                opacity: 1,
                color: '#2c3e50',
            }
        }

        return {
            fillColor: '#e74c3c',
            weight: 1,
            opacity: 0.5,
            color: '#2c3e50',
        };
    }

    onEachFeature = (feature, layer) => {
        layer.on({
            click: this.clickToFeature
        });
    }


    render() {

        const { modalData } = this.state

        return (
            <Fragment>
                <LeafletMap
                    center={[55.752121, 37.617664]}
                    zoom={10}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ecf0f1',
                    }}
                    maxZoom={14}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >
                    <GeoJSON
                        data={worldGeoJSON}
                        onEachFeature={this.onEachFeature}
                        style={this.style}
                    />
                </LeafletMap>
                {modalData &&
                <div className={style.modal}>
                    <div className={style['modal-header-wrap']}>

                        <div className={style['modal-header']}>
                            <div className={style['modal-title']}>
                                {modalData.name}
                            </div>
                            <button className={style['modal-close']} onClick={() => {
                                this.setState({
                                    modalData: null
                                })
                            }}>
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

                </div>}
            </Fragment>

        )
    }
}

export default MapComponent
