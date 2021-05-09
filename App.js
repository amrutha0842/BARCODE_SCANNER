import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      permissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }
  getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      permissions: status === 'granted',
      buttonState: 'clicked',
    });
  };
  scanCode = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const permissions = this.state.permissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && permissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.scanCode}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <Image
            source={require('./assets/barCode.png')}
            style={{ width: 310, height: 131.81 }}
          />
          <TouchableOpacity style={styles.button} onPress={this.getPermissions}>
            <Text style={styles.paragraph}>Scan</Text>
          </TouchableOpacity>
          <Text style={styles.paragraph}>
            {permissions === true ? this.state.scannedData : 'Click Here'}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    width: '25%',
    padding: 5,
    alignSelf: 'center',
    marginTop: '5%',
  },
});
