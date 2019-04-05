import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Input, Text, Avatar, Button, ListItem } from "react-native-elements";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAvatar: null,
      formNome: "",
      formEmail: "",
      formSenha: "",
      list: [
        {
          name: "Amy Farha",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "Vice President"
        },
        {
          name: "Chris Jackson",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          subtitle: "Vice Chairman"
        },
        {
          name: "Chris Jackson",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          subtitle: "Vice Chairman"
        },
        {
          name: "Chris Jackson",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          subtitle: "Vice Chairman"
        }
      ]
    };
  }

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => (
    <ListItem
      containerStyle={{
        backgroundColor: "#CCC",
        marginTop: 5
      }}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      title={item.name}
      subtitle={item.subtitle}
    />
  );
  cadastrar = () => {};

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
              onPress={() => alert("Works!")}
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
            keyExtractor={this.keyExtractor}
            data={this.state.list}
            renderItem={this.renderItem}
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
