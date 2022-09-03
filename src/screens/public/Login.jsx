import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { Input, Icon, Button, Text } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { loginUser, logoutUser } from '../../redux/actions/authActions';



const Login = () => {

  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.interface)
  const [show, setShow] = useState(false);

  return (
    <View>
      <Formik
        initialValues={{
          username: 'sebastian',
          password: 'tatannvrz'
        }}

        // validationSchema = {}

        onSubmit={(values) => {

          const credentials = {
            username: values.username,
            password: values.password
          }

          dispatch(loginUser(credentials))
        }}
      >
        {props => (
          <>
            <Input InputLeftElement={<Icon as={<FontAwesome5 name="user" />} size={5} ml="2" />} placeholder="Username"
              isDisabled={isLoading}
              onChangeText={props.handleChange('username')}
              onBlur={props.handleBlur('username')}
              value={props.values.username} />

            <Input type={show ? "text" : "password"} placeholder="Password"
              InputRightElement={<Icon as={<FontAwesome5 name={show ? "eye-slash" : "eye"} />} size={5} mr="4" onPress={() => setShow(!show)} />}
              isDisabled={isLoading}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password} />

            <Button isLoading={isLoading} onPress={props.handleSubmit}>Login</Button>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;
