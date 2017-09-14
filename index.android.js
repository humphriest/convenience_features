/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions
} from "react-native";
const width = Dimensions.get("window").width;
import SendSMS from "react-native-sms";
import SmsAndroid from "react-native-get-sms-android";
var temp;
export default class convenience extends Component {
  constructor(props) {
    super(props);
    this.state = { text: undefined, code: undefined };
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: width,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />

        <Button title="validate" onPress={() => this.validate()} />
        <Button title="read" onPress={() => this.read()} />
        <TextInput
          style={{
            height: 40,
            width: width,
            borderColor: "gray",
            borderWidth: 1
          }}
          value={this.state.code}
        />
      </View>
    );
  }
  validate() {
    SendSMS.send(
      {
        body: "9999",
        recipients: [this.state.text],
        successTypes: ["sent", "queued"]
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            "error: " +
            error
        );
      }
    );
  }

  read() {
    var filter = {
      box: "sent", // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      // address: this.state.text,
      body: "9999",
      indexFrom: 0, // start from index 0
      maxCount: 1 // count of SMS to return each time
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log("Failed with this error: " + fail);
      },
      (count, smsList) => {
        console.log("Count: ", count);
        console.log("List: ", smsList);
        var arr = JSON.parse(smsList);
        console.log("body:", arr[0].body);
        temp = arr[0].body;
      }
    );
    console.log("temp", temp);
    this.setState({
      code: temp
    });
    console.log("code:", this.state.code);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

AppRegistry.registerComponent("convenience", () => convenience);
