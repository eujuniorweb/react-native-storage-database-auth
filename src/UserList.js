import React, { Component } from "react";

import { View } from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "./fbConn";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.data.key,
      name: this.props.data.name,
      email: this.props.data.email,
      avatar: null
    };

    firebase
      .storage()
      .ref()
      .child("users/" + this.state.key + ".jpg")
      .getDownloadURL()
      .then(url => {
        let state = this.state;
        state.avatar = { uri: url };
        this.setState(state);
        console.log(state);
      })

      .catch(error => {
        alert(error.code);
      });
  }
  render() {
    return (
      <ListItem
        containerStyle={{
          backgroundColor: "#CCC",
          marginTop: 5
        }}
        leftAvatar={{ source: this.state.avatar }}
        title={this.state.name}
        subtitle={this.state.email}
      />
    );
  }
}
