import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Modal,
    TextInput,
    Button,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import { Avatar, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'
import { USER} from '../../common/Constants';

import Spinner from '../../common/Loading';
import Posts from './Posts';
import Skills from './Skills';
import Achievements from './Achievements';
import SociaMedia from './SocialMedia';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const { height, width } = Dimensions.get('window')

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
        };
    }

    async componentDidMount() {
        const user = await this.props.navigation.state.params.user;
        console.log('==================================');
        console.log('Edit Profile', user);
        this.setState({ user })
        this.setState({ ...user, spinner: false })
    }

   

    renderButton() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#ffffff" />
        }
        
    }


    onButton = (newData) => {

   firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update(
     newData
   ),

     AsyncStorage.setItem(USER,JSON.stringify(newData));
     

    }
    render() {
        const { firstName, lastName, user, spinner, email, phoneNumber, password, confirmPassword } = this.state;
        const userr = {firstName,lastName,phoneNumber,email}

        
        if (spinner) {
            return <Spinner />
        }
        else {
            return (
                <View>
                    <StatusBar backgroundColor='#2c233d' barStyle="light-content" />
                    <View style={styles.basicBackground}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <View style={styles.headerIcon}>
                                <Icon
                                    name="keyboard-backspace"
                                    size={35}
                                    color='#ffffff'
                                />
                            </View> */}
                            <Text style={styles.header1}>Edit Profile</Text>
                        </View>
                        <View style={styles.background}>
                            <View>
                                <Text style={styles.text2}>First Name</Text>
                                <TextInput
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder={firstName}
                                    placeholderTextColor='gray'
                                    value={firstName}
                                    onChangeText={(firstName) => this.setState({ firstName })}
                                />
                                <Text style={styles.text2}>Last Name</Text>
                                <TextInput
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder="Enter name"
                                    placeholderTextColor='gray'
                                    value={lastName}
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                />
                                <Text style={styles.text2}>Email</Text>
                                <TextInput
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder="Enter email"
                                    placeholderTextColor='gray'
                                    value={email}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                                <Text style={styles.text2}>Mobile Number</Text>
                                <TextInput
                                    value={phoneNumber}
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder="Enter phone number"
                                    placeholderTextColor='gray'
                                    value={phoneNumber}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                />
                                <Text style={styles.text2}>Password</Text>
                                <TextInput
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder="Enter Password"
                                    secureTextEntry={true}
                                    placeholderTextColor='gray'
                                    value={password}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                                <Text style={styles.text2}>Confirm Password</Text>
                                <TextInput
                                    style={styles.inputText}
                                    underlineColorAndroid='gray'
                                    placeholder="Enter Password"
                                    secureTextEntry={true}
                                    placeholderTextColor='gray'
                                    value={confirmPassword}
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                />
                                <View style={{ marginTop: height * 0.03 }}>
                                    <TouchableOpacity
                                        //onPress={this.onButtonPress(this.state.user)}
                                        onPress={ () => {
                                            
                                            this.onButton(userr)
                                    
                                    }}


                                    >
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#5653e2', '#795EE3', '#ae71f2']}
                                            style={styles.linearGradient}>
                                            <Text
                                                style={styles.bottonText}>
                                                Save
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    basicBackground: {
        backgroundColor: '#382d4b',
        height: '100%',
        width: '100%',
        paddingTop: height * 0.01
    },
    background: {
        backgroundColor: '#ffffff',
        height: '88%',
        width: '95%',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: height * 0.01,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.02,
        paddingLeft: width * 0.09,
        flexDirection: 'row'
    },
    headerIcon: {
        marginTop: width * 0.03,
        marginLeft: width * 0.04,
    },
    header1: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: height * 0.015,
        marginLeft: width * 0.04,
        paddingBottom: height * 0.02,
    },
    header2: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: height * 0.05,
        marginLeft: width * 0.005,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        marginTop: height * 0.02,
        marginLeft: width * 0.02,
    },
    text: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    text2: {
        color: '#382d4b',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height * 0.02,
    },
    inputText: {
        color: '#000000',
        fontSize: 17,
        textAlign: 'left',
        fontWeight: 'normal',
        width: width * 0.75,
        height: height * 0.065,
    },
    subtittle1: {
        color: '#795EE3',
        fontSize: 14,
        textDecorationLine: 'underline',
        textAlign: 'right',
        marginRight: width * 0.05,
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: width * 0.75,
        height: height * 0.055,
    },
    bottonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    or: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'center',
        marginTop: height * 0.035,
        width: width * 0.75,
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.13,
        width: width * 0.5,
    },
    subtittle2: {
        color: '#795EE3',
        fontSize: 14,
        textAlign: 'center',
        marginTop: height * 0.03,
        textDecorationLine: 'underline',
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginLeft: width * 0.01,
    }
});