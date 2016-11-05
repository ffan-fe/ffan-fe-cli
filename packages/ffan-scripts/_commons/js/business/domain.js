const domainReg = new RegExp("\.((test|sit)\.)?ffan\.com");

export function getDomain(prefix, suffix) {
  const env = getEnv();
  return `${prefix}${env || ''}${suffix}`;
}

function getEnv() {
  const host = location.host;

  if (host.match(new RegExp("^localhost:"))) {
    return "sit."
  }

  if (host.match(new RegExp("\^10\."))) {
    return "sit."
  }
  const domainTestResult  = host.match(domainReg);

  if (!domainTestResult) {
    return "sit."
  }

  return domainTestResult[1]
}

export const isDev = Boolean(getEnv());
