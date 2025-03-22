export interface ProductData {
  currentPage: string;
  currentPageResults: string;
  hitScore: any;
  products: Product[];
  timeTaken: any;
  totalPages: string;
  totalResults: string;
}
export interface Product {
  image: string;
  price: number;
  discountPerc: number;
  discountedPrice: number;
  qty: string;
  id: string;
  brand: any;
  brandId: any;
  brandCode: any;
  subBrand: any;
  subBrandId: any;
  subBrandCode: any;
  name: string;
  description?: string;
  derived_description?: string;
  gtin: string;
  gtins: any[];
  caution: any;
  sku_code: any;
  isLocalProduct: string;
  main_category: string;
  category_level_1: string;
  category_level_2: string;
  main_category_id?: string;
  mainCategoryCode: any;
  category_level_1_id?: string;
  categoryLevel1Code: any;
  category_level_2_id?: string;
  categoryLevel2Code: any;
  onMainCategory: any;
  onCategoryLevel1: any;
  onCategoryLevel2: any;
  onMainCategoryId: any;
  onCategoryLevel1Id: any;
  onCategoryLevel2Id: any;
  onMainCategoryCode: any;
  onCategoryLevel1Code: any;
  onCategoryLevel2Code: any;
  offMainCategory: any;
  offCategoryLevel1: any;
  offCategoryLevel2: any;
  offMainCategoryId: any;
  offCategoryLevel1Id: any;
  offCategoryLevel2Id: any;
  offMainCategoryCode: any;
  offCategoryLevel1Code: any;
  offCategoryLevel2Code: any;
  departmentId: any;
  departmentCode: any;
  departmentName: any;
  subDepartmentId: any;
  subDepartmentCode: any;
  subDepartmentName: any;
  lobId: any;
  lobCode: any;
  lobName: any;
  gs1category: any;
  gs1sub_category: any;
  gpc_code: any;
  minimum_order_quantity: any;
  minimum_order_quantity_unit: any;
  created_by?: string;
  compare_price: any;
  sellingUnit: any;
  is_gs1_product: any;
  marketing_info: any;
  url: any;
  soldQuantity: any;
  marketPlaceSellable: boolean;
  activation_date: string;
  deactivation_date: string;
  country_of_origin: any;
  created_date: string;
  modified_date: string;
  type: any;
  packaging_type: string;
  primary_gtin: any;
  published: any;
  gs1_images: Gs1Images;
  images: Images;
  company_detail: CompanyDetail;
  weights_and_measures: WeightsAndMeasures;
  dimensions: Dimensions;
  case_configuration: CaseConfiguration;
  mrp: Mrp;
  hs_code?: string;
  igst: string;
  cgst: string;
  sgst: string;
  cess: string;
  otherTax: any;
  returnable: any;
  sell_out_of_stock: string;
  min_order_value: string;
  label: any;
  taxCategory: any;
  articleCode: any;
  supplierItemCodes: any;
  itemReferences: any[];
  storeItemReferences: any[];
  inventoryCode: any[];
  listedOn: any[];
  attributes: Attributes;
  language: Language;
  productSource: ProductSource;
  isDeleted: boolean;
  isOfflineStored: any;
  deletedBy: any;
}

export interface Gs1Images {
  front: any;
  back: any;
  top: any;
  bottom: any;
  left: any;
  right: any;
  top_left: any;
  top_right: any;
}

export interface Images {
  front?: string;
  back?: string;
  top: any;
  bottom: any;
  left: any;
  right: any;
  top_left: any;
  top_right: any;
}

export interface CompanyDetail {
  name?: string;
  manufacturerName: any;
  brand: any;
  manufacturer: any;
  manufacturerImage: any;
  manufacturerLogo: any;
  manufacturerId: any;
  marketedBy: any;
}

export interface WeightsAndMeasures {
  measurement_unit: string;
  net_weight: string;
  gross_weight: string;
  net_content: string;
  secondarySpecs: any[];
}

export interface Dimensions {
  measurement_unit: any;
  height: any;
  width: any;
  depth: any;
}

export interface CaseConfiguration {
  gtin: any;
  quantity: any;
  height: any;
  width: any;
  depth: any;
  weight: any;
  weight_measurement_unit: any;
  dimension_measurement_unit: any;
  pack_type: any;
}

export interface Mrp {
  mrp: number;
  target_market: string;
  activation_date: string;
  currency: string;
  location: string;
}

export interface Attributes {
  nutritional_information: any;
  ingredients: any;
  ingredients_image: any;
  ean_image: any;
  storage_condition: any;
  storage_instruction: any;
  storage_temperature: any;
  regulatory_data: any;
  shelf_life: any;
  food_type: any;
  product_type_generic_name: any;
  product_variant: any;
  variant_sku: any;
  variant_default_image: any;
  health_benefit: any;
  imported_product: any;
  importer_packer_name_address: any;
  manufacturing_license_image: any;
  bogo_offers: any;
  kitted: any;
  maximum_order_quantity: any;
  keywords: any;
  form: any;
  sachet_article: any;
  weighted_item: any;
  box_contents: any;
  grain_size: any;
  packing_material_internal: any;
  packing_material_external: any;
  rigidity_of_packing: any;
  caution_warning: any;
  direction_how_to_use: any;
  direction_how_to_use_image: any;
  carbohydrates: any;
  vegan: any;
  pre_cooked: any;
  dairy_supplement: any;
  eggless: any;
  gluten_free: any;
  lactose_free: any;
  alcohol_free: any;
  speciality: any;
  product_flavour: any;
  artificial_flavour: any;
  added_flavors: any;
  added_preservatives: any;
  added_fruit: any;
  added_colours: any;
  artificial_colours: any;
  oil_extraction: any;
  allergen_information: any;
  microwaveable: any;
  safe_for_children: any;
  age_limit: any;
  productPackaging: any;
  product_on_recall: any;
  batch_number: any;
}

export interface Language {
  nativeLanguages: any[];
}

export interface ProductSource {
  sourceId: string;
  sourceLocationId: string;
  sourceType?: string;
  productStatus: string;
  hoStatus: any;
  createdDate: number;
  modifiedDate: number;
  productVisibility: any;
  supportedWarehouses: any[];
  supportedVendors: any[];
  supportedVendorNames: any[];
  supportedRetails: string[];
  marketPlaceSellers: any[];
  removeProductFrom: any[];
  deletedBy: any[];
  tags: any[];
  bundledGtins: any[];
  imageStatus: string;
  tenantId: any;
}

export enum CartActionType {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

export interface CartAction {
  id: number;
  type: "INCREASE" | "DECREASE";
}
