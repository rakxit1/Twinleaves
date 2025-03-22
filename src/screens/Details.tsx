import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  DetailsRoute,
  NavStackParams,
} from "../navigation/TwinLeavesNavigation.type";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Images } from "../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setCartItem } from "../store/slices/listSlice";

const Details = () => {
  const routeData = useRoute<DetailsRoute>();
  const productDetails = routeData.params.productDetail;
  const navigation: NavigationProp<NavStackParams> = useNavigation();

  const dispatch = useDispatch();

  const onPressAdd = () => {
    dispatch(setCartItem({ id: Number(productDetails.id), type: "INCREASE" }));
    navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              {productDetails.discountPerc}% OFF
            </Text>
          </View>
          <Image source={Images[productDetails.image]} style={styles.image} />
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
        <Text style={styles.name}>{productDetails.name.trim()}</Text>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>
            ₹{productDetails.discountedPrice}
          </Text>
          <Text style={styles.strikePrice}>₹{productDetails.price}</Text>
        </View>
        <Text style={styles.description}>
          {productDetails.description || "No description available."}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Highlights</Text>
          <Text style={styles.sectionContent}>
            - Carefully sourced to ensure the highest quality.
          </Text>
          <Text style={styles.sectionContent}>
            - Suitable for a variety of recipes and uses.
          </Text>
          <Text style={styles.sectionContent}>
            - Packed with care to preserve freshness.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutritional Information</Text>
          <Text style={styles.sectionContent}>
            This product is rich in essential vitamins and minerals, making it a
            healthy choice for your daily diet.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Instructions</Text>
          <Text style={styles.sectionContent}>
            Store in a cool, dry place away from direct sunlight. Once opened,
            keep refrigerated and consume within 3 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <Text style={styles.sectionContent}>
            - Manufactured and packed under hygienic conditions.
          </Text>
          <Text style={styles.sectionContent}>
            - Free from harmful additives and artificial colors.
          </Text>
          <Text style={styles.sectionContent}>
            - Ideal for health-conscious individuals.
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    marginBottom: 80,
  },
  imageContainer: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#F0EFF0",
    overflow: "hidden",
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
  image: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
  greenLogo: {
    height: 25,
    width: 25,
    position: "absolute",
    bottom: 15,
    left: 10,
    zIndex: 1,
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
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
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
  qtyText: {
    color: "#767776",
  },
  rightIcon: {
    marginRight: 5,
    marginTop: 2,
  },
  priceView: {
    marginTop: 5,
    flexDirection: "row",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  strikePrice: {
    marginTop: 1,
    marginLeft: 5,
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 12,
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  section: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "white",
    alignItems: "center",
  },
  addButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
