/**
 * JS file containing all env. and derived variables.
 */

const SERVICE_NAME = process.env.SERVICE_NAME || 'subsidy-applications-retrieval-service';
const SERVICE_URI = `http://data.lblod.info/services/${SERVICE_NAME}`;

export {
  SERVICE_NAME,
  SERVICE_URI
}
