import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { selectCart, selectListData } from "../store/slices/listSlice";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "../types/types";
import { Images } from "../assets";
import { useCameraPermissions, CameraView } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  NavStackParams,
  Screen,
} from "../navigation/TwinLeavesNavigation.type";

const Cart = () => {
  const listData = useSelector(selectListData);
  const cartData = useSelector(selectCart);
  const navigation: NavigationProp<NavStackParams> = useNavigation();
  const camera = useRef<CameraView>(null);
  const qrLock = useRef(false);
  const [_, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onPressScan = async () => {
    await requestPermission();
    setModalVisible(true);
  };
  // Get cart items with details from listData
  const cartItems = cartData.map((cartItem) => {
    const product = listData?.products.find(
      (item: Product) => Number(item.id) === cartItem.id
    );
    return { ...product, qty: cartItem.qty };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalDiscountedPrice = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.qty,
    0
  );
  const totalDiscount = totalPrice - totalDiscountedPrice;

  const onPressShop = () => {
    alert("Purchased");
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.centerContainer}>
        <Text>No Items in the cart. Please add some products.</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Product & { qty: number } }) => (
    <View style={styles.itemContainer}>
      <Image source={Images[item.image]} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.discountedPrice}</Text>
        <Text style={styles.qty}>Quantity: {item.qty}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cartHeader}>
        <Text style={styles.title}>Cart</Text>
        <Ionicons
          name="scan"
          size={24}
          color="black"
          style={styles.scanIcon}
          onPress={onPressScan}
        />
      </View>
      <Modal
        style={{ flex: 1 }}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <SafeAreaView style={styles.cameraContainerView}>
          <CameraView
            style={styles.cameraStyles}
            ref={camera}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;
                setTimeout(() => {
                  const products = listData?.products.slice(0, 10) || [];
                  const randomProduct =
                    products[Math.floor(Math.random() * products.length)];
                  qrLock.current = false;
                  setModalVisible(false);
                  navigation.navigate(Screen.DETAILS, {
                    productDetail: randomProduct,
                  });
                }, 500);
              }
            }}
            ratio="16:9"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        </SafeAreaView>
      </Modal>
      <FlatList
        data={cartItems}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {cartItems.length > 0 && (
        <>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Price:</Text>
              <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Discount:</Text>
              <Text style={styles.summaryValue}>
                ₹{totalDiscount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Final Total:</Text>
              <Text style={styles.summaryValue}>
                ₹{totalDiscountedPrice.toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shopButton} onPress={onPressShop}>
            <Text style={styles.shopButtonText}>Shop to Pay</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  headerBtnContainer: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  absoluteView: { marginTop: 30, marginBottom: 20 },
  headerBtn: { margin: 20, padding: 10, width: 50 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cameraStyles: { flex: 1 },
  list: {
    paddingBottom: 20,
  },
  bottomBtnView: { flex: 1, justifyContent: "flex-end" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  captureButton: { paddingHorizontal: 50 },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  qty: {
    fontSize: 14,
    color: "#555",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  shopButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  shopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  emptyView: { marginBottom: 64 },
  bottomBtnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scanIcon: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cameraContainerView: { flex: 1, backgroundColor: "#000" },
});
