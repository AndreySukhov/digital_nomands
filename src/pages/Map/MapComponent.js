import React, { Component, Fragment } from 'react';
import {GeoJSON, Map as LeafletMap} from "react-leaflet";

import { createRandomNum } from "../../utils";
import Modal from './Modal'


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

        if (prevProps.context.district !== this.props.context.district) {
            this.setState({
                currentDistrict: this.props.context.district
            })
        }

    }

    clickToFeature = (e) => {

        this.props.onClear()
        this.props.context.setDistrict('')
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
            fillColor: feature.properties.fillColor,
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
                        data={this.props.json}
                        onEachFeature={this.onEachFeature}
                        style={this.style}
                    />
                </LeafletMap>
                {modalData &&
                    <Modal modalData={modalData}
                        onClose={() => {
                        this.setState({
                            modalData: null
                        })}
                        }
                    />
                }
            </Fragment>

        )
    }
}

export default MapComponent
