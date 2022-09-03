import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/private/admin/Home';
import Options from '../../../screens/private/admin/Options';
import Assistance from '../../../screens/private/admin/Assistance'
import { fetchGrades } from '../../../redux/actions/gradeActions'



const Stack = createNativeStackNavigator()

const RouterAdmin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGrades())
    }, []);

    return (
        <Stack.Navigator initialRouteName='Inicio'>
            <Stack.Screen name='Inicio' component={Home} options={({ navigation }) => ({
                headerShown: false
            })} />

            <Stack.Screen name='Asistencia' component={Assistance} options={({ navigation }) => ({
                headerShown: false
            })} />

            <Stack.Screen name='Opciones' component={Options} options={({ navigation }) => ({
                headerShown: false
            })} />
        </Stack.Navigator>
    );
};

export default RouterAdmin;
