import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Image } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import TapBar from '../../../components/TapBar';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import global from '../../../helpers/styles'

import { logoutUser } from '../../../redux/actions/authActions';

const screen_x = Dimensions.get('window').width
const screen_y = Dimensions.get('window').height


const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)


    return (
        <View style={styles.container}>

            <View style={{ flex: 2, marginHorizontal: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '10%' }}>
                    <FontAwesome5 name="bars" size={24} color="#2f3447" />
                    <Image source={require('../../../../assets/colegio.png')} style={{ width: screen_x / 5, height: screen_y / 10 }} alt='logo de la institucion' resizeMode='center' />
                </View>
                <View style={{ marginTop: '5%' }}>
                    <Text style={[global.font, { fontSize: screen_x / 12 }]} numberOfLines={1} adjustsFontSizeToFit>Hola, {user.first_name}!</Text>
                    <Text style={[global.font, { fontSize: screen_x / 22, marginTop: '-3%' }]}>Bienvenido</Text>
                </View>
            </View>

            <View style={{ flex: 5 }}>
                <SafeAreaView style={styles.safeare}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Asistencia')}>
                                <View style={[styles.decoration, { backgroundColor: '#1ccd9d' }]}></View>
                                <View style={{ marginHorizontal: '10%', width: screen_x / 3.5 }}>
                                    <FontAwesome name="check-square-o" size={screen_x / 10} color="#1ccd9d" style={{ alignSelf: 'flex-end', marginBottom: 10 }} />
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: screen_x / 18 }} >Asistencia</Text>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: screen_x / 30 }}>Tomar asistencia del dia</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.card}>
                                <View style={[styles.decoration, { backgroundColor: '#456efe' }]}></View>
                                <View style={{ marginHorizontal: '10%', width: screen_x / 3.5 }}>
                                    <FontAwesome name="pencil" size={screen_x / 10} color="#456efe" style={{ alignSelf: 'flex-end', marginBottom: 10 }} />
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: screen_x / 18 }}>Notas</Text>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: screen_x / 30 }}>Agregar notas a estudiante</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        

                        <Button onPress={() => dispatch(logoutUser())}>Logout</Button>
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.tapbar}>
                    <TapBar navigation={navigation} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#f4f7ff'
    },
    tapbar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    safeare: {
        marginBottom: (screen_x * 10) / 100,
        marginHorizontal: screen_x / 20
    },
    card: {
        width: screen_x / 2.5,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        flexDirection: 'row',
        marginHorizontal: '25%',
        padding: '4%',
        marginBottom: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 0.84,
        elevation: 0.5,
    },
    decoration: {
        width: '6%',
        borderRadius: 20,
    }

});


export default Home;
