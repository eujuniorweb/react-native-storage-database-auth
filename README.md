# Código de exemplo integrando o firebase storage, auth e database utilizando o expo.

 1. Criar o arquivo src/config/dev.js com o seguinte código:
```
    const dev = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    export default dev;
```

 2. Dentro de "" de cada constante colocar os valores de configuração do
    firebase.
 3. Após isso aplicar um npm install e depois npm start
