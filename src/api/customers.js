import api, { constructUrlQuery } from '../utils/api';

export function getCustomers(query = {}) {
  const queries = constructUrlQuery(query);
  return api.get(`/v1/customers${queries}`);
}

export function getCustomer(customerId) {
  return api.get(`/v1/customers/${customerId}`);
}

export function createCustomer(customerDetails = {}) {
  return api.post('/v1/customers', customerDetails);
}

export function updateCustomer(customerDetails = {}) {
  return api.put(`/v1/customers/${customerDetails.id}`, customerDetails);
}

export function deleteCustomer(customerId) {
  return api.delete(`/v1/customers/${customerId}`);
}
