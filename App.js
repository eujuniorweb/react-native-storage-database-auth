import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Input, Text, Avatar, Button } from "react-native-elements";
import { ImagePicker, Permissions } from "expo";
import firebase from "./src/fbConn";
import UserList from "./src/UserList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAvatar:
        "https://sigma-static-files.imgix.net/default_profile_pic.png",
      formNome: "",
      formEmail: "",
      formSenha: "",
      imagem: null,
      key: "",
      userUid: 0,
      list: []
    };

    firebase.auth().signOut();
    firebase
      .database()
      .ref("users")
      .on("value", data => {
        let state = this.state;
        state.list = [];
        data.forEach(child => {
          state.list.push({
            key: child.key,
            name: child.val().name,
            email: child.val().email
          });
        });
        this.setState(state);
      });
  }

  takePicture = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    if (cameraPermission.status === "granted") {
      let takeImage = await ImagePicker.launchCameraAsync({
        exif: true,
        allowsEditing: true,
        quality: 0.7,
        base64: true,
        aspect: [4, 3]
      });
      if (!takeImage.cancelled) this.setState({ formAvatar: takeImage.uri });
    }
  };
  async uploadImageAsync(uri, avatar, mime) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const snapshot = await avatar.put(blob, { contentType: mime });

    // We're done with the blob, close and release it
    blob.close();

    //return await snapshot.ref.getDownloadURL();
  }

  saveAvatar = () => {
    let uri = this.state.formAvatar;
    let avatar = firebase
      .storage()
      .ref()
      .child("users")
      .child(this.state.userUid + ".jpg");
    let mime = "image/jpg";
    this.uploadImageAsync(uri, avatar, mime)
      .then(() => {
        this.saveUser();
      })
      .catch(error => {
        alert(error.code);
      });
  };
  saveUser = () => {
    if (this.userUid != 0) {
      firebase
        .database()
        .ref("users")
        .child(this.state.userUid)
        .set({
          name: this.state.formNome,
          email: this.state.formEmail
        });

      let state = this.state;
      state.formAvatar = null;
      state.formNome = "";
      state.formEmail = "";
      state.formSenha = "";
      state.userUid = 0;
      this.setState(state);
      alert("Usuário criado com sucesso!");
    }
  };
  cadastrar = () => {
    if (
      this.state.formAvatar !=
        "https://sigma-static-files.imgix.net/default_profile_pic.png" &&
      this.state.formNome != "" &&
      this.state.formEmail != "" &&
      this.state.formSenha != ""
    ) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let state = this.state;
          state.userUid = user.uid;
          this.setState(state);
          this.saveAvatar();
        }
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.formEmail,
          this.state.formSenha
        )
        .catch(error => {
          alert(error.code);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cadastroArea}>
          <Text style={{ marginTop: 20, alignSelf: "center" }} h3>
            Cadastro
          </Text>
          <View style={styles.form}>
            <Avatar
              rounded
              size="xlarge"
              onPress={this.takePicture}
              source={{
                uri: this.state.formAvatar
                //"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              }}
              showEditButton
              containerStyle={{ alignSelf: "center" }}
            />
            <Input
              inputStyle={{ marginTop: 5 }}
              placeholder="Nome Completo"
              value={this.state.formNome}
              onChangeText={formNome => this.setState({ formNome })}
            />
            <Input
              inputStyle={{ marginTop: 5 }}
              placeholder="Email"
              value={this.state.formEmail}
              onChangeText={formEmail => this.setState({ formEmail })}
            />
            <Input
              secureTextEntry
              inputStyle={{ marginTop: 5 }}
              placeholder="Senha"
              value={this.state.formSenha}
              onChangeText={formSenha => this.setState({ formSenha })}
            />
            <Button
              buttonStyle={{ marginTop: 15, width: 200, alignSelf: "center" }}
              title="Cadastrar"
              onPress={this.cadastrar}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) => <UserList data={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cadastroArea: {
    height: 420,
    backgroundColor: "#EEE",
    margin: 2,
    padding: 2
  },
  form: {
    margin: 5,
    padding: 5
  }
});
