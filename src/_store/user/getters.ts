import { PiniaGetters, PiniaGetterTree } from '../piniaTypes';
import { UserStore } from '.';

export interface UserGetters extends PiniaGetterTree {
  getEmail(): string;
  getStatus(): string;
  isAuthenticated(): boolean;
  isAuthorized(): boolean;
  getPreferences(): any;
  getUser(): any;
  getUserWithTrashPreference(): boolean;
  getUserType(): string;
  isColormeAppStoreUser(): boolean;
  getShopName(): string;
  getShop(): string;
  getShopId(): string;
  getShopUrl(): string;
  industrySuppliesAlcohol(): boolean;
  getWallLoader(): boolean;
  getPlatform(): string;
  isWordpressUser(): boolean;
  isNonEc(): boolean;
  isEc(): boolean;
  isOtherNonEc(): boolean;
  hasNoConversion(): boolean;
  isOtherShop(): boolean;
  getUserPlanCharges(): number;
  getUserName(): string;
}

export const getters: PiniaGetters<UserStore> = {
  getEmail(): string {
    return this.email ?? '';
  },

  getStatus(): string {
    return this.userStatus;
  },

  isAuthenticated(): boolean {
    return !!this.authorizationStatus;
  },

  isAuthorized() {
    return !!this.token;
  },

  getPreferences(): any {
    return (this.user as any).preferences ? (this.user as any).preferences : {};
  },

  getUser(): any {
    return this.user;
  },

  getUserWithTrashPreference(): boolean {
    return this.user.preferences.with_trash;
  },

  getUserType(): string {
    return this.userType;
  },

  isColormeAppStoreUser(): boolean {
    return this.userType == 'colorme_store';
  },

  getShopName(): string {
    return this.user?.shop.name;
  },

  getShop(): string {
    return (this.user as any).shop;
  },

  getShopId(): string {
    return (this.user as any).shop.platform_id;
  },

  getShopUrl(): string {
    return (this.user as any).shop.shop_url;
  },

  industrySuppliesAlcohol(): boolean {
    return (this.user as any).shop.supplies_alcohol;
  },

  getWallLoader(): boolean {
    return this.transparentWallLoader;
  },

  // Only use during registration
  getPlatform(): string {
    return this.platform;
  },

  isWordpressUser(): boolean {
    return (this.user as any).shop.platform_id
      .toLowerCase()
      .includes('wordpress');
  },

  isNonEc(): boolean {
    return (this.user as any).shop.platform_id
      .toLowerCase()
      .match(/^wordpress$|^other_non_ec$/);
  },

  isEc(): boolean {
    // Only wordpress and other non ec are non ec users
    return !this.isNonEc;
  },

  isOtherNonEc(): boolean {
    return (this.user as any).shop.platform_id
      .toLowerCase()
      .match(/^other_non_ec$/);
  },

  hasNoConversion(): boolean {
    return (this.user as any).shop.platform_id
      .toLowerCase()
      .match(/^other_non_ec$|^other_ec$/)
      ? true
      : false;
  },

  isOtherShop(): boolean {
    return (this.user as any).shop.platform_id.toLowerCase().includes('other');
  },

  getUserPlanCharges(): number {
    return this.user.plan_charges;
  },

  getUserName(): string {
    return this.user.first_name ? `${this.user.first_name} ${this.user.last_name}` : this.user.name;
  }
};
