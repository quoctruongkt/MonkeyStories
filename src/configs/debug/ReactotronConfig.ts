import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Monkey Stories',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
