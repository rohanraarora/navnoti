import { Navigation,NativeEventsReceiver } from 'react-native-navigation';

import React, { Component } from 'react';
import DemoScreen from "./DemoScreen";
import {Platform}  from "react-native";
import {setupPushMessageListeners} from "./cloudMessaging";


export default class App extends Component {

  constructor(props){
    super(props);

    setupPushMessageListeners();
    if (Platform.OS === 'ios') {
      this.startApp()
    }
    else {
      Navigation.isAppLaunched()
        .then(appLaunched => {
          if (appLaunched) {
            this.startApp(); // App is launched -> show UI
          }
          new NativeEventsReceiver().appLaunched(this.startApp); // App hasn't been launched yet -> show the UI only when needed.
        });
    }

  }

  startApp(){

    Navigation.registerComponent('example.DemoScreen', () => DemoScreen);
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'example.DemoScreen', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      }
    });

  }
}
