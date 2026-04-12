export interface Payment {
  _id: string;
  name: string | null;
  email: string | null;
  phone: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: "pending" | "created" | "paid" | "failed";
  source?: "website" | "whatsapp";
  timestamp: string;
  errorCode?: string;
  errorDescription?: string;
  emailSent: boolean;
}

export interface Profile {
  _id: string;
  razorpayOrderId: string;
  name: string | null;
  email: string | null;
  phone: string;
  whatsappPhone?: string;
  gender?: string;
  city?: string;
  state?: string;
  occupation?: string;
  reason?: string;
  hasPurchasedCourse: boolean;
  coursePurchasePrice?: number;
  courseName?: string;
  source?: "website" | "whatsapp";
  isDeleted?: boolean;
  timestamp: string;
}

export interface DashboardStats {
  today: {
    customers: number;
    revenue: number;
    orders: number;
  };
  allTime: {
    customers: number;
    revenue: number;
    orders: number;
  };
}

export interface PaymentTrendPoint {
  date: string;
  revenue: number;
  orders: number;
  failed: number;
}

export interface ProfileTrendPoint {
  date: string;
  count: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  payments?: T[];
  profiles?: T[];
}

export interface Order {
  _id: string;
  name: string | null;
  phone: string;
  email: string | null;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  timestamp: string;
  source?: string;
  emailSent: boolean;
  whatsappPhone?: string;
  gender?: string;
  city?: string;
  state?: string;
  occupation?: string;
  reason?: string;
  remark?: string;
  isDeleted?: boolean;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  total: number;
  totalRevenue: number;
  avgOrderValue: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Facets {
  genders: string[];
  cities: string[];
  states: string[];
  occupations: string[];
}

export interface MetaAdsCampaign {
  campaignId: string;
  campaignName: string;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  cpm: number;
  cpc: number;
  ctr: number;
  frequency: number;
  linkClicks: number;
  purchases: number;
  costPerPurchase: number;
  landingPageViews: number;
  costPerLandingPageView: number;
}

export interface MetaAdsSummary {
  success: boolean;
  totalSpend: number;
  campaigns: MetaAdsCampaign[];
}

export interface MetaAdsDailySpend {
  date: string;
  spend: number;
}

export interface MetaAdsAdSet {
  adsetId: string;
  adsetName: string;
  campaignId: string;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  cpm: number;
  cpc: number;
  ctr: number;
  frequency: number;
  linkClicks: number;
  purchases: number;
  costPerPurchase: number;
  landingPageViews: number;
  costPerLandingPageView: number;
}

export interface MetaAdsAd {
  adId: string;
  adName: string;
  adsetId: string;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  cpm: number;
  cpc: number;
  ctr: number;
  frequency: number;
  linkClicks: number;
  purchases: number;
  costPerPurchase: number;
  landingPageViews: number;
  costPerLandingPageView: number;
  thumbnailUrl?: string | null;
  title?: string | null;
  body?: string | null;
}

export interface MetaAdsAdSetResponse {
  success: boolean;
  totalSpend: number;
  adsets: MetaAdsAdSet[];
}

export interface MetaAdsAdResponse {
  success: boolean;
  totalSpend: number;
  ads: MetaAdsAd[];
}
