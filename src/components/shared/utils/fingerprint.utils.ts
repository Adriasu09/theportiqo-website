import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const response = await fp.get();
  
  return response.visitorId;
};
