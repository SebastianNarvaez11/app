import { View, Text, Dimensions } from 'react-native';
import { Chase } from 'react-native-animated-spinkit'
import global from '../helpers/styles';

const screen_x = Dimensions.get('window').width
const screen_y = Dimensions.get('window').height

const Spinner = ({ size, text }) => {
    return (
        <View style={{alignItems: 'center'}}>
            <Chase size={size} color="#5460fe" style={{ alignSelf: 'center' }} />
            <Text style={[global.font, { fontSize: screen_x / 30, color: '#989ebe', paddingTop: screen_y / 35 }]}>{text}</Text>
        </View>
    )
}

export default Spinner