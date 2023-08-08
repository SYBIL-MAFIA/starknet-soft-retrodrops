import fs from 'fs'
import Workers from './utils/workers.js';
import { General } from './setting/config.js';


export const loadWallets = async () => {
  try {
      const mm_keys = fs.readFileSync('./data/mm_keys.txt', "utf8")
          .split("\n")
          .map(row => row.trim())
          .filter(row => row !== "");

      const stark_keys = fs.readFileSync('./data/stark_keys.txt', "utf-8")
          .split("\n")
          .map(row => row.trim())
          .filter(row => row !== "");

      const okecx = fs.readFileSync('./data/okx_addresses.txt', "utf-8")
          .split("\n")
          .map(row => row.trim())
          .filter(row => row !== "");

        const withdrawalAddressOkx = fs.readFileSync('./data/okxStarknetWithdrawal.txt', "utf-8")
          .split("\n")
          .map(row => row.trim())
          .filter(row => row !== "");

      return { mm_keys, stark_keys, okecx, withdrawalAddressOkx };
  } catch (err) {
      console.error(`Error while loading wallet data: ${err.message}`);
      throw err;
  }
};

const main = async () => {
  let addressIndex = 0; 
    const values = await loadWallets()
  const mmKeys =  values.mm_keys;
  const starkKeys = values.stark_keys
  const okecx = values.okecx
  const withdrawalAddressOkx = values.withdrawalAddressOkx
  
  const groups = [];
  for (let i = 0; i < mmKeys.length; i += General.threads_counter) {
    groups.push(mmKeys.slice(i, i + General.threads_counter));
  }

  for (const group of groups) {
    const promises = [];
    
    for (const mmKey of group) {
      const starkKey = starkKeys.shift();
      const okecxKey = okecx.shift();
      const StarlnetOkx = withdrawalAddressOkx.shift()
      const workerInstance = new Workers(mmKey, starkKey, okecxKey, addressIndex,StarlnetOkx);
      promises.push(workerInstance.execute());
  
      addressIndex++; 
    }
    
    try {
      await Promise.all(promises);

    } catch (error) {
      console.error("Ошибка в главной функции:", error);
    }
    
    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    });
  }
};

main().catch(console.error);
