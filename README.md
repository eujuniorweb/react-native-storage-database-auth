# react-native-storage-database-auth
Código de exemplo integrando o firebase storage, auth e database utilizando o expo.
Criar o arquivo src/config/dev.js com o seguinte conteúdo:

const dev = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
export default dev;

Dentro de "" de cada constante colocar os valores de configuração do firebase.

Após isso aplicar um npm install e depois npm start.

