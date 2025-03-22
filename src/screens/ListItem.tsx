import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Images } from "../assets";
import { Product } from "../types/types";
import AnimatedPressable from "../components/AnimatedPressable";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, setCartItem } from "../store/slices/listSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  NavStackParams,
  Screen,
} from "../navigation/TwinLeavesNavigation.type";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ListItemProps {
  item: Product;
  index: number;
}

const ListItem = ({ item, index }: ListItemProps) => {
  const navigation: NavigationProp<NavStackParams> = useNavigation();
  const cartData = useSelector(selectCart);

  const sv = useSharedValue<number>(0.9);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sv.value }],
  }));

  const onPressItem = () => {
    navigation.navigate(Screen.DETAILS, {
      productDetail: { ...item, image: item.image },
    });
  };

  const [bookMark, setbookMark] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleBookmark = () => {
    setbookMark(!bookMark);
  };

  const onPressAdd = (id: string) => {
    dispatch(setCartItem({ id: Number(id), type: "INCREASE" }));
  };

  const onPressIncrease = (id: string) => {
    dispatch(setCartItem({ id: Number(id), type: "INCREASE" }));
  };

  const onPressDecrease = (id: string) => {
    dispatch(setCartItem({ id: Number(id), type: "DECREASE" }));
  };

  return (
    <Pressable style={styles.itemContainer} onPress={onPressItem}>
      <View style={styles.card}>
        <View>
          <View style={styles.imageContainer}>
            <View style={styles.tagContainer}>
              <Animated.Text style={[styles.tagText, animatedStyle]}>
                {item.discountPerc}% OFF
              </Animated.Text>
            </View>
            <Image source={Images[item.image]} style={styles.image} />
            <Image source={Images.GREEN} style={styles.greenLogo} />
          </View>
          <View style={styles.timeTag}>
            <MaterialCommunityIcons
              name="motorbike"
              size={20}
              color="black"
              style={styles.iconRight}
            />
            <Text>2 hrs</Text>
          </View>
          <Text style={styles.freshoText}>Fresho</Text>
          <Text style={styles.name}>{item.name.trim()}</Text>
          <View style={styles.qtyView}>
            <Text style={styles.qtyText}>{item.qty}</Text>
            <AntDesign
              name="down"
              size={15}
              style={styles.rightIcon}
              color="black"
            />
          </View>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>₹{item.discountedPrice}</Text>
            <Text style={styles.strikePrice}>₹{item.price}</Text>
          </View>
          <View
            style={[
              styles.tagLineView,
              [0, 1].includes(index) && styles.sastaView,
            ]}>
            <View />
            <Text
              style={[
                styles.tagLinetext,
                [0, 1].includes(index) && styles.sastaText,
              ]}>
              {[0, 1].includes(index) ? "Har Din Sasta!" : "Buy 1 Get 1 Free"}
            </Text>
            <AntDesign
              name="down"
              size={15}
              style={styles.rightIcon}
              color={[0, 1].includes(index) ? "green" : "red"}
            />
          </View>
          <View style={styles.btnView}>
            {cartData.some((cartItem) => cartItem.id === Number(item.id)) ? (
              <>
                <AnimatedPressable
                  style={[styles.bookmarkBtn, bookMark && styles.bookedMark]}
                  onPress={toggleBookmark}>
                  <FontAwesome name="bookmark-o" size={16} color="black" />
                </AnimatedPressable>
                <View style={styles.qtyControlContainer}>
                  <Pressable
                    style={[styles.qtyButton, styles.decreaseButton]}
                    onPress={() => onPressDecrease(item.id)}>
                    <Text style={styles.qtyButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.cartText}>
                    {
                      cartData.find(
                        (cartItem) => cartItem.id === Number(item.id)
                      )?.qty
                    }
                  </Text>
                  <Pressable
                    style={[styles.qtyButton, styles.increaseButton]}
                    onPress={() => onPressIncrease(item.id)}>
                    <Text style={styles.qtyButtonText}>+</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <AnimatedPressable
                  style={[styles.bookmarkBtn, bookMark && styles.bookedMark]}
                  onPress={toggleBookmark}>
                  <FontAwesome name="bookmark-o" size={16} color="black" />
                </AnimatedPressable>
                <AnimatedPressable
                  style={styles.button}
                  onPress={() => onPressAdd(item?.id)}>
                  <Text style={styles.buttonText}>Add</Text>
                </AnimatedPressable>
              </>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  btnView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  priceView: {
    marginTop: 5,
    flexDirection: "row",
  },
  imageContainer: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#F0EFF0",
    overflow: "hidden",
  },
  spacer: { width: 8 },
  itemContainer: {
    height: "95%",
    marginTop: 15,
    width: Dimensions.get("screen").width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tagContainer: {
    backgroundColor: "#5a7d1a",
    position: "absolute",
    top: 0,
    paddingHorizontal: 15,
    left: 0,
    zIndex: 1,
    paddingVertical: 3,
    borderBottomEndRadius: 10,
    alignSelf: "flex-start",
  },
  tagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bookmarkBtn: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DCDDDD",
    marginRight: 10,
  },
  card: {
    width: "90%",
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 300,
  },
  greenLogo: {
    height: 25,
    width: 25,
    position: "absolute",
    bottom: 15,
    left: 10,
    zIndex: 1,
  },
  image: {
    width: Dimensions.get("screen").width - 100,
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
  name: {
    height: 30,
    fontSize: 13,
    fontWeight: "600",
  },
  strikePrice: {
    marginTop: 1,
    marginLeft: 5,
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 12,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
  timeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    padding: 5,
    marginTop: 8,
    alignSelf: "flex-end",
  },
  iconRight: { marginRight: 5 },
  freshoText: {
    color: "#9C9C9C",
    marginTop: -10,
    marginBottom: 5,
  },
  qtyView: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#E9E9EA",
    padding: 5,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagLineView: {
    marginTop: 30,
    borderWidth: 1,
    backgroundColor: "#FFE6D4",
    borderColor: "#E9E9EA",
    padding: 5,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightIcon: {
    marginRight: 5,
    marginTop: 2,
  },
  qtyText: {
    color: "#767776",
  },
  tagLinetext: { color: "red" },
  sastaView: { backgroundColor: "#E1F0C8" },
  sastaText: { color: "green" },
  bookedMark: {
    backgroundColor: "#E1F0C8",
  },
  qtyControlContainer: {
    borderWidth: 2,
    borderColor: "red",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  qtyButton: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  decreaseButton: {
    marginRight: 10,
  },
  increaseButton: {
    marginLeft: 10,
  },
  qtyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cartText: {
    flex: 1,
    textAlign: "center",
    color: "red",
  },
});
