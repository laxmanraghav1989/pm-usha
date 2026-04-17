// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // authLogin: 'https://demo.he.nic.in/pmushaApi/auth/login',
  authLogin: "https://demo.he.nic.in/pmushaApi/auth/login",
  // authLogin: "http://10.206.194.253:82/pmushaApi/auth/login",
  // baseUrlCaptcha: "https://api1.he.nic.in/usermanagement/",
  baseUrlCaptcha: 'https://pdf.aishe.nic.in/usermanagement/',
  otpURL: "https://demo.he.nic.in/aisheusermanagementdemo/",
  masterUrl: `https://api1.he.nic.in/aishemasterservice`,
  // baseURL: `http://10.206.194.253:81/pmusha/`,
  
  // baseURL: `http://10.206.194.250:81/pmusha/`,
  baseURL: `https://demo.he.nic.in/pmusha/`,
  baseURLInstituteManagement: `https://api1.he.nic.in/aisheinstitutemanagement/`,
  baseDeleteURL: "https://demo.he.nic.in/pmusha/delete/",
  // baseDeleteURL: 'http://10.206.194.253:81/pmusha/delete/',
  eSignGateway: `https://nic-esigngateway.nic.in/eSign21L2/acceptClient`,
  eSignCdac: `https://es-staging.cdac.in/esignlevel1/2.1/form/signdoc`,
  clientrequestURL:
  
    "https://demo.he.nic.in/pm-usha/#/app/npd/consolidatedProposal",
  // eSignGateway:`https://nic-esign2gateway.nic.in/eSign21/acceptClient`,
  baseTimeUrl1: 'https://pdf.aishe.nic.in/usermanagement/',
  baseTimeUrl: 'https://su-api.aishe.nic.in/usermanagement/',

  fundManagementRequestURL:
    "https://demo.he.nic.in/pm-usha/#/app/fundManagement",

  otpUpdateUrl: 'https://demo.he.nic.in/pmushaotpservice/'

  //  ip:'10.206.194.253'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
