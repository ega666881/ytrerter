import * as dns from "node:dns";

export async function isIpv6Supported(domain: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    dns.setServers(['8.8.8.8']);

    dns.resolve6(domain, (err, addresses) => {
      if (err) {
        switch (err.code) {
          case 'ENODATA': {
            return reject(false)
          }
          case 'ENOTFOUND': {
            return reject(new Error(`DNS connection refused for ${domain}`));
          }
        }
      } else {
        resolve(true);
      }
    });
  });
}
