import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

// Component hiển thị một sản phẩm yêu thích
const CompItem = ({ sp }) => {
    return (
        <View style={styles.row}>
            <Image source={{ uri: sp.photo }} style={styles.photo_sp} />
            <Text style={styles.text_name_sp}>{sp.name}</Text>
            <View style={styles.view_desc}>
                <Text style={styles.text_desc}>
                    {sp.descrip}
                </Text>
            </View>
        </View>
    );
};

const FavoritesScreen = ({ navigation }) => {
    const link_api = "http://10.24.27.163:3000/favorites"; // Link API lấy danh sách sản phẩm yêu thích
    const [dsSpFV, setDsSpFV] = useState([]); // State chứa danh sách sản phẩm yêu thích

    // Hàm lấy danh sách sản phẩm từ API
    const getList = async () => {
        try {
            const response = await fetch(link_api); // Đợi lấy nội dung từ server
            const data = await response.json(); // Chuyển kết quả về dạng JSON
            setDsSpFV(data); // Đổ dữ liệu vào state
        } catch (error) {
            console.log(error); // Xử lý lỗi nếu có
        }
    };

    useEffect(() => {
        getList(); // Lấy danh sách sản phẩm khi component được mount

        const interval = setInterval(() => {
            getList(); // Tự động tải lại danh sách sản phẩm mỗi 10 giây
        }, 10000);

        // Dọn dẹp khi component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.menu_profile}>
                <Pressable style={styles.ic_menu} onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../img/ic_menu.png')} style={styles.ic_menu} />
                </Pressable>
            </View>
            <Text style={styles.text_welcome}>Favorites</Text>
            <SafeAreaView style={styles.home_favor}>
                <FlatList
                    data={dsSpFV}
                    renderItem={({ item }) => <CompItem sp={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15,
    },
    menu_profile: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ic_menu: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 0,
    },
    text_welcome: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    home_favor: {
        flex: 1,
    },
    row: {
        padding: 7,
        backgroundColor: '#252a32',
        marginBottom: 20,
        borderRadius: 10,
    },
    text_name_sp: {
        fontSize: 20,
        color: '#ffffff',
        marginBottom: 12,
    },
    photo_sp: {
        height: 300,
        borderRadius: 10,
        marginBottom: 18,
    },
    view_desc: {
        padding: 5,
    },
    text_desc: {
        color: '#ffffff',
        fontSize: 14,
    },
});