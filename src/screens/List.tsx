import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewabilityConfig,
  ViewToken,
  Pressable,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import AntDesign from "@expo/vector-icons/AntDesign";

import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product, ProductData } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListData,
  selectTotalQty,
  setInitdData,
} from "../store/slices/listSlice";
import AnimatedPressable from "../components/AnimatedPressable";
import ListItem from "./ListItem";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { selectUserInfo } from "../store/slices/authSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  NavStackParams,
  Screen,
} from "../navigation/TwinLeavesNavigation.type";
import { Images } from "../assets";

const PAGE_SIZE = 10;

const getRandomNumber = () => {
  return Math.floor(Math.random() * (40 - 20 + 1)) + 20;
};

const get80To150 = () => {
  return Math.floor(Math.random() * (150 - 80 + 1)) + 80;
};
const getOneToFive = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const List = () => {
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();
  const navigation: NavigationProp<NavStackParams> = useNavigation();
  const sumQty = useSelector(selectTotalQty);

  const animValue = useSharedValue(1);

  useEffect(() => {
    animValue.value = 1;
    animValue.value = withRepeat(withTiming(0.7, { duration: 100 }), 2, true);
  }, [sumQty]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animValue.value }],
    };
  }, []);

  const listData = useSelector(selectListData);
  const userInfo = useSelector(selectUserInfo);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const wiggleAnim = useSharedValue(0);

  const onPressHand = () => {
    wiggleAnim.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 170 }), 5, true),
      withTiming(0, { duration: 50 })
    );
  };

  const onPressCart = () => {
    navigation.navigate(Screen.CART);
  };

  const animHandStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${wiggleAnim.value}deg` }],
    };
  });

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    setCurrIndex(viewableItems[0]?.index ?? 0);
  };

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  const onPressLeftRight = (direction: "LEFT" | "RIGHT") => () => {
    if (direction === "LEFT") {
      flatListRef.current?.scrollToIndex({
        index: currIndex - 1,
        animated: true,
      });
      setCurrIndex(currIndex - 1);
    } else if (direction === "RIGHT") {
      flatListRef.current?.scrollToIndex({
        index: currIndex + 1,
        animated: true,
      });
      setCurrIndex(currIndex + 1);
    }
  };

  const fetchProducts = async (): Promise<ProductData> => {
    const response = await axios.post(
      "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product",
      {
        page: "1",
        pageSize: String(PAGE_SIZE),
        sort: { creationDateSortOption: "DESC" },
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery(["LIST"], fetchProducts);

  useEffect(() => {
    onPressHand();
    if (data) {
      const finalData = {
        ...data,
        products: data.products.map((product: Product, index) => {
          const imageNum =
            Object.values(Images)[index % Object.values(Images).length];
          const price = get80To150();
          const discountPerc = getRandomNumber();
          const qty = [0, 1].includes(index) ? "1 kg" : `${getOneToFive()} pc`;
          const discountedPrice = Number(
            (price - (price * discountPerc) / 100).toFixed(0)
          );

          return {
            ...product,
            price,
            discountPerc,
            qty,
            discountedPrice,
            image: imageNum,
          };
        }),
      };
      dispatch(setInitdData(finalData));
    }
  }, [data, dispatch]);

  if (error) return <Text>Something went wrong</Text>;
  if (isLoading)
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameHeader}>
        <Text style={styles.userName} onPress={onPressHand}>
          Hello, {userInfo?.data?.user.givenName ?? ""}
        </Text>
        <Animated.View style={[styles.handStyle, animHandStyles]}>
          <Pressable onPress={onPressHand}>
            <Text style={styles.hand}>👋</Text>
          </Pressable>
        </Animated.View>
        {sumQty !== 0 && (
          <Pressable style={styles.cartsIcon} onPress={onPressCart}>
            <Animated.View style={animatedStyle}>
              <Text style={styles.countNumText}>{sumQty}</Text>
            </Animated.View>
          </Pressable>
        )}
        <MaterialIcons
          onPress={onPressCart}
          name="shopping-cart"
          size={24}
          color="black"
          style={styles.logoutIcon}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.titleText}>My Smart Basket</Text>
        <View style={styles.rowView}>
          <Text style={styles.viewAll}>View All</Text>
          <AnimatedPressable
            style={[styles.btnContainer, currIndex === 0 && styles.disabledBtn]}
            onPress={onPressLeftRight("LEFT")}
            disabled={currIndex === 0}>
            <AntDesign name="left" size={20} color="black" />
          </AnimatedPressable>
          <View style={styles.spacer} />
          <AnimatedPressable
            style={[
              styles.btnContainer,
              currIndex === PAGE_SIZE - 1 && styles.disabledBtn,
            ]}
            onPress={onPressLeftRight("RIGHT")}
            disabled={currIndex === PAGE_SIZE - 1}>
            <AntDesign name="right" size={20} color="black" />
          </AnimatedPressable>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
        data={listData?.products ?? []}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => <ListItem item={item} index={index} />}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  rowView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  spacer: { width: 8 },
  disabledBtn: { backgroundColor: "#EBEBEB" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
  },
  viewAll: {
    textDecorationLine: "underline",
    marginRight: 15,
  },
  btnContainer: {
    padding: 5,
    borderRadius: 6,
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
  list: {},
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hand: { fontSize: 20 },
  nameHeader: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  handStyle: {
    marginRight: "auto",
  },
  logoutIcon: {
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
  countNumText: {
    color: "white",
  },
  cartsIcon: {
    position: "absolute",
    right: -8,
    top: -8,
    alignItems: "center",
    backgroundColor: "#BF1D08",
    width: 24,
    height: 24,
    justifyContent: "center",
    zIndex: 10,
    borderRadius: 100,
  },
});
