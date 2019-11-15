import React, {useState} from 'react';
import MapView,  {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Buttons from '../styles/Buttons';
const eventSpots = [
    {
      id: 1,
      title: 'BasketBall with John',
      spots: 4,
      free: 2,
      coordinate: {
        latitude: 27.943764,
        longitude: -82.444901,
      }
    },
    {
      id: 2,
      title: 'Bowling with George',
      spots: 4,
      free: 2,
      coordinate: {
        latitude: 27.043764,
        longitude: -81.444901,
      }
    },
    {
      id: 3,
      title: 'Parking 3',
      price: 10,
      rating: 4.9,
      spots: 50,
      free: 25,
      coordinate: {
        latitude: 37.78615,
        longitude: -122.4314,
      }
    },
  ];
export default class MapLanding extends React.Component {
constructor(props) {
    super(props)}
    state= {
        region:
        {
        latitude: 27.943764,
        longitude: -82.444901,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
}


gotoMyLocation(){
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (this.map) {
          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      (error) => alert('Error: Are location services on?'),
      { enableHighAccuracy: true }
    )
  }
  onRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    return (
        <View style={styles.container}>
    <MapView
          ref={(map) => { this.map = map; }}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={this.state.region}
          onRegionChangeCompleted={this.onRegionChange}
        >
            
      {eventSpots.map(event =>
            <Marker 
              key={`marker-${event.id}`}
              coordinate={event.coordinate}
              title={event.title}/>
            )}

            </MapView>
            <TouchableOpacity onPress={this.gotoMyLocation.bind(this)} style={[ Buttons.textAuth, Buttons.textPrimary ]}>
            <Text>Set location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: 300,
    height: 200,
  },
  button: {
      width: "100%",
      backgroundColor: 'purple',
      height: 100,
      borderRadius: 5
  }
});
