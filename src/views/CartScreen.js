import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Tạo component cho 1 dòng dữ liệu
const CompItem = ({ sp, onQuantityChange, onRemove }) => {
    const navigation = useNavigation(); // Lấy đối tượng navigation

    // Xử lý sự kiện khi nhấn vào một mục
    const onPressItem = () => {
        navigation.navigate('Pay', { product: sp }); // Chuyển hướng sang màn hình Payment
    };

    // Hàm giảm số lượng
    const decreaseQuantity = () => {
        if (sp.quantity > 1) {
            onQuantityChange(sp.id, sp.quantity - 1);
        } else {
            onRemove(sp.id);
        }
    };

    // Hàm tăng số lượng
    const increaseQuantity = () => {
        onQuantityChange(sp.id, sp.quantity + 1);
    };

    return (
        <View style={styles.row}>
            <View style={styles.photoQuantity}>
                <Image source={{ uri: sp.photo }} style={styles.photoSp} />
                <View style={styles.quantity}>
                    <Pressable style={styles.addQuantity} onPress={decreaseQuantity}>
                        <Text style={styles.quantityText}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityNumber}>{sp.quantity}</Text>
                    <Pressable style={styles.addQuantity} onPress={increaseQuantity}>
                        <Text style={styles.quantityText}>+</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.viewPayment}>
                <View>
                    <Text style={styles.textNameSp}>{sp.name}</Text>
                    <View style={styles.price}>
                        <Text style={styles.priceSymbol}>$</Text>
                        <Text style={styles.priceValue}>{sp.priceupdate}</Text>
                    </View>
                </View>
                <Pressable onPress={onPressItem} style={styles.viewBuy}>
                    <Text style={styles.buyText}>BUY</Text>
                </Pressable>
            </View>
        </View>
    );
};

const CartScreen = ({ navigation }) => {
    const linkApi = "http://10.24.27.163:3000/carts";

    const [cartItems, setCartItems] = useState([]);

    // Hàm lấy danh sách sản phẩm từ API
    const getList = async () => {
        try {
            const response = await fetch(linkApi);
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm cập nhật số lượng sản phẩm
    const updateQuantity = async (id, quantity) => {
        try {
            await fetch(`${linkApi}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            updatePriceOnAPI(id, quantity);
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm cập nhật giá trị tiền trên API
    const updatePriceOnAPI = async (id, quantity) => {
        try {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                const newPrice = (item.price * quantity).toFixed(1);
                await fetch(`${linkApi}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ priceupdate: newPrice })
                });
                getList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = async (id) => {
        try {
            await fetch(`${linkApi}/${id}`, {
                method: 'DELETE'
            });
            getList();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getList();
        const interval = setInterval(getList, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.menuProfile}>
                <Pressable style={styles.icMenu} onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../img/ic_menu.png')} style={styles.icMenu} />
                </Pressable>
            </View>
            <Text style={styles.textWelcome}>Cart</Text>
            <View style={styles.homeCart}>
                <SafeAreaView>
                    <FlatList
                        style={styles.list}
                        data={cartItems}
                        renderItem={({ item }) => (
                            <CompItem
                                sp={item}
                                onQuantityChange={updateQuantity}
                                onRemove={removeItem}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15
    },
    menuProfile: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icMenu: {
        width: 30,
        height: 30,
        marginStart: 2,
        position: 'absolute',
        left: 0
    },
    textWelcome: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    homeCart: {},
    row: {
        padding: 7,
        backgroundColor: '#252a32',
        marginBottom: 20,
        borderRadius: 10
    },
    photoQuantity: {
        flexDirection: 'row',
        marginBottom: 15
    },
    quantity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addQuantity: {
        backgroundColor: 'gray',
        width: 30,
        height: 30,
        borderRadius: 5
    },
    quantityText: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center'
    },
    quantityNumber: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        marginStart: 20,
        marginEnd: 20
    },
    textNameSp: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    list: {
        margin: 0
    },
    photoSp: {
        height: 120,
        width: 120,
        borderRadius: 10,
        marginEnd: 15
    },
    price: {
        flexDirection: 'row'
    },
    priceSymbol: {
        fontSize: 24,
        color: '#d17842',
        fontWeight: 'bold',
        marginEnd: 10
    },
    priceValue: {
        fontSize: 22,
        color: '#ffffff',
        fontWeight: 'bold',
        marginEnd: 10
    },
    viewPayment: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewBuy: {
        width: 100,
        height: 50,
        backgroundColor: '#D17842',
        position: 'absolute',
        right: 0,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default CartScreen;