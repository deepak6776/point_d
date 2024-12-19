
export interface MenuItems {
  href: string;
  icon: React.JSX.Element;
  label: string;
}

export interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface EmailVerifyRequest {
  token: string;
  userId: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  password: string;
  token: string;
  userId: string;
}

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  verified: boolean;
}

export interface NewProductInfo {
  title: string;
  description: string;
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  quantity: number;
  thumbnail?: File;
  images: File[];
}

export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  bulletPoints?: string[];
  images?: {
    url: string;
    id: string;
  }[];
  thumbnail: {
    url: string;
    id: string;
  };
  category: string;
}

export interface ProductToUpdate {
  title: string;
  description: string;
  bulletPoints: string[];
  category: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  thumbnail?: { url: string; id: string };
  images?: { url: string; id: string }[];
}

export interface NewCartRequest {
  productId: string;
  quantity: number;
}

export interface NewFeaturedProduct {
  banner: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}

export interface FeaturedProductForUpdate {
  banner?: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}

export interface UserProfileToUpdate {
  avatar?: { url: string; id: string };
  name: string;
  id: string;
}

export interface CartProduct {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  totalPrice: number;
  qty: number;
}

export interface CartItems {
  products: CartProduct[];
  id: string;
  totalQty: number;
  totalPrice: number;
}

export interface StripeCustomer {
  metadata: {
    userId: string;
    cartId: string;
    type: "checkout" | "instant-checkout";
    product: string;
  };
}

export interface ReviewRequestBody {
  productId: string;
  comment?: string;
  rating: number;
}


export interface NewToolInfo {
  title: string;
  thumbnail?: File;
  description: string;
  category: string;
  link: string;
  status: string;
  author: string;
}
export interface NewBlogInfo {
  title: string;
  description:string;
  thumbnail?: File;
  author: string;
  category: string;
  body:string;
  status: string;

}

export interface NewBlogCategoryInfo {
  title: string;
  thumbnail?:File;
  description:string;
  slug:string;
}

export interface NewToolCategoryInfo {
  title: string;
  thumbnail?:File;
  description:string;
  slug:string;
}


export interface ToolToUpdate {
  title: string;
  description: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  category: string;
  link: string;
  status: string;
  author: string;
}

export interface BlogToUpdate {
  title: string;
  description: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  author: string;
  category: string;
  body: string;
  status: string;
}

export interface BlogCategoryToUpdate {
  title: string;
  description: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  slug: string;
}

export interface ToolCategoryToUpdate {
  title: string;
  description: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  slug: string;
}

export interface ToolResponse {
  id: string;
  title: string;
  description: string;
  thumbnail?: {
    url: string;
    id: string;
  };
  category: string;
  link: string;
  status: string;
  author: string;
}

export interface BlogResponse {
  id: string;
  title: string;
  description:string;
  thumbnail?: {
    url: string;
    id: string;
  };
  category: string;
  body: string;
  status: string;
  author: string;
}

export interface BlogCategoryResponse {
  id: string;
  title: string;
  description:string;
  thumbnail?: {
    url: string;
    id: string;
  };
  slug: string;
}

export interface ToolCategoryResponse {
  id: string;
  title: string;
  description:string;
  thumbnail?: {
    url: string;
    id: string;
  };
  slug: string;
}