// Query to get a delivery
const GET_DELIVERY = `
  query GetDelivery($deliveryId: IDCustomScalar!) {
    delivery(id: $deliveryId) {
      id
      createdAt
      distance
      price
      estimatedTravelTime
      deliveryMethod
      deliveredAt
      deliveryMeta {
        dropoffNote
        pickupNote
        poNumber
        orderNumber
      }
      deliveryStatus {
        name
        code
      }
      origin {
        name
        addressLine1
        addressLine2
        city
        state
        postalCode
        latitude
        longitude
      }
      destination {
        name
        addressLine1
        addressLine2
        city
        state
        postalCode
        latitude
        longitude
      }
      driver {
        firstName
        lastName
        phoneNumber
        profileImageUrl
        lastKnownLocation {
          latitude
          longitude
        }
      }
      images
      trackingUrl
    }
  }
`;
// Mutation to cancel a delivery
const CANCEL_DELIVERY = `
  mutation CancelDelivery($deliveryId: String!) {
    cancelDelivery(id: $deliveryId) {
      success
      message
    }
  }
`;
// Query to list deliveries
const GET_DELIVERIES = `
  query GetDeliveries($accountId: String!) {
    deliveries(accountId: $accountId) {
      id
      status
      deliveryMethod
      fee
    }
  }
`;
// Query to get a delivery quote
const GET_DELIVERY_QUOTE = `
  query GetDeliveryQuote($input: DeliveryQuoteQueryInput!) {
    deliveryQuote(input: $input) {
      deliveryMethod
      deliveryMethodDisplayName
      distance
      duration
      fee
      feeComparison {
        rush
        sameday
        scheduled
      }
      id
      pickupDuration
      priority
    }
  }
`;
// Query to search deliveries
const SEARCH_DELIVERIES = `
  query adminSearchDeliveries(
    $query: String
    $filterFacet: String
    $limit: Int
    $offset: Int
    $orderBy: String
    $lookBackDays: Int
  ) {
    adminDeliveries(
      filterFacet: $filterFacet
      query: $query
      offset: $offset
      limit: $limit
      orderBy: $orderBy
      lookBackDays: $lookBackDays
      historical: true
    ) {
      id
      externalId
      createdAt
      distance
      deliveryMethod
      priority
      scheduledAt
      deliveredAt
      isApi
      deliveryStatus {
        id
        code
        isActiveStatus
      }
      origin {
        addressLine1
        city
        state
        postalCode
      }
      destination {
        addressLine1
        city
        state
        postalCode
      }
      originatingUser {
        id
        firstName
        lastName
        emailAddress
      }
      driver {
        id
        firstName
        lastName
        phoneNumber
      }
      invoice {
        subtotal
        total
      }
    }
  }
`;
const API_URL = "https://api.curri.com/graphql";
const AUTH_TOKEN = process.env.CURRI_BEARER_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicmlhbi5nb256YWxlekBjdXJyaS5jb20iLCJpYXQiOjE3MDI1NjEwNjgsImV4cCI6MTcwNTE1MzA2OH0.w991j7u4JrI4P2ZzoVNAM-nAld6PIJaSpvFDSX7lAKc";
// Helper function for GraphQL requests
async function graphqlRequest(query, variables = {}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    const result = await response.json();
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    return result.data;
}
// Updated export functions
export function getDelivery(deliveryId) {
    return graphqlRequest(GET_DELIVERY, { deliveryId });
}
export function cancelDelivery(deliveryId) {
    return graphqlRequest(CANCEL_DELIVERY, { deliveryId });
}
export function getDeliveries(accountId) {
    return graphqlRequest(GET_DELIVERIES, { accountId });
}
export function getDeliveryQuote(input) {
    return graphqlRequest(GET_DELIVERY_QUOTE, { input });
}
export function searchDeliveries(params = {}) {
    return graphqlRequest(SEARCH_DELIVERIES, {
        query: params.query || "",
        filterFacet: params.filterFacet || "",
        limit: params.limit || 50,
        offset: params.offset || 0,
        orderBy: params.orderBy || "booked",
        lookBackDays: params.lookBackDays || 30,
    });
}
