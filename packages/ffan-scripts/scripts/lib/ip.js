import os from 'os';

let isLoopback = (addr) => {
  return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/
      .test(addr) ||
    /^fe80::1$/.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
};

export default function() {
  let interfaces = os.networkInterfaces();
  let family = 'ipv4';

  let all = Object.keys(interfaces).map(function (nic) {
    let addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();
      if (details.family !== family || isLoopback(details.address)) {
        return false;
      } else {
        return true;
      }
    });

    return addresses.length ? addresses[0].address : undefined;
  }).filter(Boolean);

  return !all.length ? '127.0.0.1' : all[0];
};