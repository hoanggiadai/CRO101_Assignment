import { Dimensions, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { Image } from 'react-native-elements';

const DescriptionScreen = ({ route, navigation }) => {
    const { product } = route.params; // Lấy dữ liệu sản phẩm từ route params
    const link_api = "http://10.24.27.163:3000/carts";

    const addToFavorites = async () => {
        try {
            // Kiểm tra sự tồn tại của sản phẩm trước khi thêm
            let response = await fetch(link_api);
            let favorites = await response.json();

            // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách yêu thích
            if (favorites.find(item => item.id === product.id)) {
                alert("This product is already in your favorites.");
                return;
            }

            // Nếu sản phẩm chưa tồn tại, thêm vào danh sách yêu thích
            await fetch(link_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            alert("Product added to favorites!");
        } catch (error) {
            console.error(error);
            alert("Failed to add product to favorites.");
        }
    };

    const addToCarts = async () => {
        try {
            // Kiểm tra sự tồn tại của sản phẩm trước khi thêm
            let response = await fetch(link_api);
            let carts = await response.json();

            // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách sản phẩm
            if (carts.find(item => item.id === product.id)) {
                alert("This product is already in your cart.");
                return;
            }

            // Nếu sản phẩm chưa tồn tại, thêm vào danh sách cart
            await fetch(link_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...product, priceupdate: product.price, quantity: 1 }),
            });

            alert("Product added to cart!");
        } catch (error) {
            console.error(error);
            alert("Failed to add product to cart.");
        }
    };

    const handleBuyPress = () => {
        // Chuyển sang màn hình PaymentScreen và truyền dữ liệu sản phẩm
        navigation.navigate('Pay', { product, priceupdate: product.price, quantity: 1 });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: product.photo }} style={styles.anh_nen}>
                <View style={styles.view_header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../img/ic_back.png')} style={styles.ic_back} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addToFavorites(product)}>
                        <Image source={require('../img/ic_heart.png')} style={styles.ic_heart} />
                    </TouchableOpacity>
                </View>
                <View style={styles.view_name}>
                    <Text style={styles.text_name}>{product.name}</Text>
                    <TouchableOpacity onPress={() => addToCarts()}>
                        <Image source={require('../img/ic_cart.png')} style={styles.ic_cart} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.child_container}>
                <Text style={styles.text_desc}>Description</Text>
                <View style={styles.child_desc_1}>
                    <Text style={{ fontSize: 14, color: '#aeaeae' }}>{product.descrip}</Text>
                </View>
                <View style={styles.child_desc_2}>
                    <View style={styles.price}>
                        <Text style={{ fontSize: 16, color: '#52555a' }}>Price</Text>
                        <View style={styles.view_child_price}>
                            <Text style={{ fontSize: 20, color: '#d17842', fontWeight: 'bold', marginEnd: 10 }}>$</Text>
                            <Text style={{ fontSize: 18, color: '#ffffff' }}>{product.price}</Text>
                        </View>
                    </View>
                    <Pressable style={styles.buy} onPress={() => { handleBuyPress() }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ffffff' }}>BUY</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default DescriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
    },
    view_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1
    },
    ic_heart: {
        width: 50,
        height: 50,
    },
    ic_cart: {
        width: 40,
        height: 40,
    },
    ic_back: {
        width: 50,
        height: 50,
    },
    anh_nen: {
        width: Dimensions.get('window').width,
        height: 550,
        justifyContent: 'flex-end',
    },
    view_name: {
        height: 100,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text_name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    text_desc: {
        fontSize: 18,
        color: '#aeaeae',
    },
    child_container: {
        flex: 1,
        padding: 15,
    },
    child_desc_1: {
        flex: 3,
        padding: 5,
    },
    child_desc_2: {
        flex: 1,
        flexDirection: 'row',
    },
    price: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buy: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d17842',
        borderRadius: 20,
        marginTop: 10,
    },
    view_child_price: {
        flexDirection: 'row',
    },
});