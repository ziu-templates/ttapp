export const MODULE_NAME = 'util';

export function getENV() {
  let envData = {};
  try {
    envData = process.env.ENV_DATA;
  } catch (e) {
    console.log(e);
  }
  return envData;
}
