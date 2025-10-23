export class AppConstants {
  static baseapiUrl = 'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/';
  static baseapiUrl2 = ' https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/';
  public baseCartapiUrl = 'https://devapi.bringjal.com//dev/';
  static appconfigUrl = './assets/configuration/webconfig.json';
  static deviceDeposit = 500; 
  static apiAccessKey = 'token';
  static baseapiUrl3 = '';
  // https://f6mvvxu2u5.execute-api.ap-south-1.amazonaws.com/dev/
   
  // Login URL's
  static login = 'api/user/login';
  static signUp = 'api/user/signup';
  static signUpOTPVreification = 'api/user/otp/signup/verify/Otp';
  static retryOTP = 'api/user/sendotp';
  static sendOTP = 'api/user/forget/password/sendotp';
  static forgetPasswordSendOtp = 'api/user/forget/password/sendotp';
  static forgetPasswordVerifyOtp = 'api/user/forgot/password/verifyotp';
  static updateUserPassword = 'api/update/user/password';

  // Dashboard Urls
  static editName = 'api/update/user/name';
  static editEmail = 'api/update/user/email';
  static editMobileNumber = 'api/update/user/mobile';
  static updateMobileSendOTP =  'api/user/update/mobile/sendotp';
  static retryOtpMobileUpdate = 'api/user/re/update/mobile/retryotp';
  static getDeposits = 'api/user/get/deposits/data';
  static getDepositTransactions = 'api/user/get/user/deposit/transactions';
  static getUserAddressDetails = 'api/user/get/user/address/details';
  static getWalletAmount = 'api/get/money/info/in/wallet';
  static getWalletSummary = 'api/get/wallet/summary/for/user';
  static getpreviousorders = 'api/getpreviousorders/of/user';
  static editQuantityModifyPackage = 'api/user/modify/package/change/quantity'
  // static uploadFiles = 'api/upload/image/generate/ticket/bringjal/watercan';
  static uploadFiles = 'https://aucxv1bttj.execute-api.ap-south-1.amazonaws.com/dev/api/upload/image/generate/ticket/bringjal/watercan'
  static generateTicket = 'user/generate/ticket/for/user';
  static applyCouponCode = 'api/user/apply/coupon/code/to/cart'
  
  // ServicableDelAreaWithProducts url
  static servicableDelAreaWithProducts = 'api/user/under/servicable/area/and/available/products';

  // Cart service 
  static cartCreation = 'api/user/create/and/add/products/to/cart';

  // intersted Area api url api/interested/user/out/of/service/area
  static interestedArea = 'api/interested/user/out/of/service/area';

  // COD Cart order
  static codCartOrderPlacement = 'api/user/verify/otp/and/take/pay/through/cash/on/delivery';
}
