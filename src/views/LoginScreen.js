import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = ({ navigation }) => {
    // Khai báo state và hàm setter cho state
    const [isUserName, setIsUserName] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [dsUser, setDsUser] = useState([]);

    // Địa chỉ API
    const link_api = "http://10.24.27.163:3000/users";

    // Hàm lấy danh sách người dùng từ API và cập nhật vào state
    const fetchUserListFromAPI = async () => {
        try {
            const response = await fetch(link_api);
            const userList = await response.json();
            setDsUser(userList);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    // Gọi hàm lấy danh sách người dùng từ API khi màn hình được tạo ra
    useEffect(() => {
        fetchUserListFromAPI();
    }, []);

    // Hàm kiểm tra thông tin đăng nhập
    const validateLogin = async (username, password) => {
        try {
            const validUser = dsUser.find(user => user.userName === username && user.password === password);
            return !!validUser;
        } catch (error) {
            console.error('Error validating login:', error);
            return false;
        }
    };

    // Hàm xử lý khi nhấn nút đăng nhập
    const handleLoginPress = async () => {
        if (await validateLogin(isUserName, isPassword)) {
            navigation.replace('MyDrawer');
        } else {
            Alert.alert('Username or Password wrong!');
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../img/logo_fpoly.png')} style={styles.logo_fpoly} resizeMode='center' />
            {/* Hình nền */}
            <Image source={require('../img/anh_nen.png')} style={styles.anh_nen} />
            {/* Tiêu đề */}
            <Text style={styles.text_welcome}>Welcome to Lungo !!</Text>
            <Text style={styles.text_welcome_2}>Login to Continue</Text>
            {/* Ô nhập tên người dùng */}
            <TextInput
                style={styles.input}
                placeholder='UserName'
                onChangeText={userName => setIsUserName(userName)}
                placeholderTextColor={'#52555a'}
            />
            {/* Ô nhập mật khẩu */}
            <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={pass => setIsPassword(pass)}
                secureTextEntry={true}
                placeholderTextColor={'#52555a'}
            />
            {/* Ô checkbox 'Remember Me' */}
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isChecked}
                    onValueChange={setIsChecked}
                    tintColors={{ true: '#ff6347', false: '#778899' }}
                />
                <Text style={styles.label}>Remember Me</Text>
            </View>
            {/* Nút Đăng nhập */}
            <Pressable style={styles.view_sign_in} onPress={handleLoginPress}>
                <Text style={styles.text_sign_in}>Sign In</Text>
            </Pressable>
            {/* Chuyển hướng đến màn hình Đăng ký */}
            <View style={styles.view_register_reset}>
                <Text style={styles.text_register_reset_white}>Don't have an account? Click</Text>
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text_register_reset}>Register</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15,
        justifyContent: 'center'
    },
    anh_nen: {
        width: 170,
        height: 170,
        alignSelf: 'center',
        marginTop: 50
    },
    logo_fpoly: {
        width: 150,
        height: 50,
        alignSelf: 'center'
    },
    text_welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 20
    },
    text_welcome_2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#52555a',
        textAlign: 'center',
        marginTop: 10
    },
    input: {
        fontSize: 20,
        height: 55,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#52555a',
        color: '#52555a',
        padding: 5,
        marginTop: 30
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginLeft: 8
    },
    view_sign_in: {
        backgroundColor: '#d17842',
        height: 70,
        borderRadius: 25,
        marginTop: 30,
        justifyContent: 'center',
        marginBottom: 15
    },
    text_sign_in: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    view_register_reset: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    text_register_reset_white: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    text_register_reset: {
        color: '#d17842',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5
    }
});

export default LoginScreen;