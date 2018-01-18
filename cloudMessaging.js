
import {Platform} from 'react-native';
import {NotificationsAndroid} from "react-native-notifications/index.android";



export const setupPushMessageListeners = () => {
  if(Platform.OS === 'android'){
    setupAndroidListeners();
  }
}

const setupAndroidListeners = () => {

  console.log("Cloud Messaging, Setting listeners")
  NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
    // TODO: Send the token to my server so it could send back push notifications...
    console.log('Push-notifications registered!', deviceToken);
  });
  NotificationsAndroid.refreshToken();
  NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened);
  NotificationsAndroid.setNotificationReceivedListener(onNotificationReceived);
};

const onNotificationOpened = (notification) => {
  console.log("onNotificationOpened: ", notification);
  //this.setState({lastNotification: notification.getData(), notificationRxTime: this.state.elapsed});
}

const onNotificationReceived = (notification) => {
  console.log("onNotificationReceived: ", notification);
}
