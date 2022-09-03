import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouterAdmin from '../router/private/admin/RouterAdmin';
import HomeStudent from '../screens/private/student/Home';
import Login from '../screens/public/Login';
import Waiting from '../screens/public/Waiting';
import { existToken } from '../helpers/existToken'




const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const Router = () => {

    const dispatch = useDispatch()

    const { user, isAuthenticated, isChecking } = useSelector(state => state.auth)


    useEffect(() => {
        existToken(dispatch)
    }, []);


    if (isChecking) {
        return <Waiting />
    }

    return (
        <NavigationContainer>
            {isAuthenticated ?
                <Drawer.Navigator>
                    {user.type === 1 &&
                        <Drawer.Screen name='RouterAdmin' component={RouterAdmin} options={({ navigation }) => ({
                            headerShown: false
                        })} />
                    }
                    {user.type === 2 &&
                        <Drawer.Screen name='Estudiante' component={HomeStudent} options={({ navigation }) => ({
                            headerShown: true
                        })} />
                    }
                </Drawer.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name='Login' component={Login} options={({ navigation }) => ({
                        headerShown: true
                    })} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
};


export default Router;
