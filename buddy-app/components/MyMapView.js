import React from 'react';
import  MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MyMapView = (props) => {
    return (
        <MapView
            provider={ PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <Marker
                coordinate={props.region} />
        </MapView>
    )
}
export default MyMapView;