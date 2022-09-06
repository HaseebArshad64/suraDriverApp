import axios from 'axios';

export const serverUrl = 'https://www.suradelivery.com/';
const apiUrl = `${serverUrl}api/`;

const GET = 'get';

export const loginAPI = async (phone: string) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}riders.php?phone=${phone}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const getCategoryAPI = async (id: number) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}category.php?restaurantId=${id}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const getOrdersAPI = async (id: number) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}products.php?restaurantId=${id}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const placeOrderAPI = async (data: number) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}order.php?data=${data}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const getOrdersHistoryAPI = async () => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}getNewOrders.php`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const getOrdersHistoryProductsAPI = async (id: string) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}orderHistoryProducts.php?orderId=${id}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

export const markAsComplete = async (id: string) => {
  const response = await axios({
    method: GET,
    url: `${apiUrl}completeOrder.php?orderId=${id}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

// export const signUpAPI = async (registerData: string): unknown[] => {
//   const {firstName, lastName, email, password} = registerData;
//   const response = await axios({
//     method: POST,
//     url: profileUrl,
//     data: {
//       first_name: firstName,
//       last_name: lastName,
//       email: email.toLowerCase(),
//       password: password,
//     },
//   });
//   return response.data;
// };

// export const verifyAccAPI = async (token: string, code: string): unknown[] => {
//   const response = await axios({
//     method: POST,
//     url: verificationUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//     data: {
//       activation_code: code,
//     },
//   });
//   return response.data;
// };

// export const fetchAirportStartListAPI = async (token: string): unknown[] => {
//   const response = await axios({
//     method: GET,
//     url: startAirportsUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const fetchAirportDestinationListAPI = async (
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: GET,
//     url: destinationAirportsUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const fetchNearestAirportListAPI = async (
//   token: string,
//   latitude: number,
//   longitude: number,
//   startAirports: boolean,
// ): unknown[] => {
//   const nearestAirportUrl = startAirports
//     ? startAirportsUrl
//     : destinationAirportsUrl;
//   const response = await axios({
//     method: GET,
//     url: `${nearestAirportUrl}&dist=100000&point=${longitude},${latitude}`,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const resetPassAPI = async (email: string): void => {
//   const response = await axios({
//     method: POST,
//     url: resetPassUrl,
//     data: {
//       email: email,
//     },
//   });
//   return response.data;
// };

// export const fetchAircraftClassListAPI = async (
//   userTripData: AIRCRAFT_CLASS_LIST_TRIP_PROPS_TYPE,
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: POST,
//     data: userTripData,
//     url: requestRouteUrl,
//     headers: {
//       accept: 'application/json',
//       'Accept-Language': locale,
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const createBookingAPI = async (
//   bookingDetails: AIRCRAFT_CLASS_LIST_TRIP_PROPS_TYPE,
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: POST,
//     data: bookingDetails,
//     url: bookingUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const bookingListAPI = async (token: string): unknown[] => {
//   const response = await axios({
//     method: GET,
//     url: bookingUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const fetchUserDetailsAPI = async (token: string): unknown[] => {
//   const response = await axios({
//     method: GET,
//     url: profileUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const updateUserDetailsAPI = async (
//   userDetails: string[],
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: PUT,
//     data: userDetails,
//     url: updateProfileUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const uploadProfilePictureAPI = async (
//   profilePicture: string[],
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: POST,
//     data: profilePicture,
//     url: uploadPictureUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const getCountriesList = async (token: string): unknown[] => {
//   const response = await axios({
//     method: OPTIONS,
//     url: profileUrl,
//     headers: {
//       accept: 'application/json',
//       'Accept-Language': locale,
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data.actions.POST.country.choices;
// };

// export const fetchBillingAddressAPI = async (token: string): unknown[] => {
//   const response = await axios({
//     method: GET,
//     url: billingDetailsUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };

// export const updateBillingAddressAPI = async (
//   billingDetails: string[],
//   token: string,
// ): unknown[] => {
//   const response = await axios({
//     method: POST,
//     data: billingDetails,
//     url: billingDetailsUrl,
//     headers: {
//       accept: 'application/json',
//       Authorization: `${USER_TOKEN} ${token}`,
//     },
//   });
//   return response.data;
// };
