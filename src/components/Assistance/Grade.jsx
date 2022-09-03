import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { FontAwesome5, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import global from '../../helpers/styles';

const screen_x = Dimensions.get('window').width
const screen_y = Dimensions.get('window').height

const Grade = ({ grade, isActive, assistances }) => {


    if (isActive) {
        return (
            <View style={styles.gradeActive}>
                {assistances.length !== 0 &&
                    assistances.map(assis => assis.grade.id === grade.id && <FontAwesome name="check-circle" size={20} color="#1CCD9D" />)
                }
                <Text style={[global.fontB, { fontSize: screen_x / 14, color: '#ffffff', marginBottom: -10 }]}>{grade.abreviation}</Text>
                <Text style={[global.font, { fontSize: screen_x / 45, color: '#ffffff' }]} numberOfLines={1} adjustsFontSizeToFit>{grade.name}</Text>
            </View>
        )
    }


    return (
        <View style={styles.grade}>
            {assistances.length !== 0 &&
                assistances.map(assis => assis.grade.id === grade.id && <FontAwesome name="check-circle" size={20} color="#1CCD9D" />)
            }
            <Text style={[global.fontB, { fontSize: screen_x / 14 , marginBottom: -10}]}>{grade.abreviation}</Text>
            <Text style={[global.font, { fontSize: screen_x / 45 }]} numberOfLines={1} adjustsFontSizeToFit>{grade.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    grade: {
        width: screen_x / 6,
        alignItems: 'center',
        padding: screen_x / 50,
        marginRight: screen_x / 30
    },
    gradeActive: {
        backgroundColor: '#5460fe',
        width: screen_x / 6,
        alignItems: 'center',
        padding: screen_x / 50,
        marginRight: screen_x / 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }
});


export default Grade