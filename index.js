import fs from 'fs'
import shuffle from 'lodash/shuffle.js';
import Workers from './utils/workers.js';
import { General } from './setting/config.js';


export const loadWallets = async () => {
  try {
      const mm_mnemonics = fs.readFileSync('./data/mmData.txt', "utf8")
          .split("\n")
          .map(row => row.trim())
          .filter(row => row !== "");

      const stark_mnemonics = fs.readFileSync('./data/starkData.txt', "utf-8")
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


      return { mm_mnemonics, stark_mnemonics, okecx, withdrawalAddressOkx };
  } catch (err) {
      console.error(`Error while loading wallet data: ${err.message}`);
      throw err;
  }
};

const main = async () => {
  let addressIndex = 0; 
  const values = await loadWallets()

  let allData = values.stark_mnemonics.map((item, index) => ({
    stark: item,
    mm: values.mm_mnemonics[index],
    okecx: values.okecx[index],
    withdrawalOkx: values.withdrawalAddressOkx[index],
  }));

  if (General.shuffleAccounts) {
    allData = shuffle(allData);
  }

  const mmMnemonics =  allData.map(item => item.mm);
  const starkMnemonics = allData.map(item => item.stark);
  const okecx = allData.map(item => item.okecx);
  const withdrawalAddressOkx = allData.map(item => item.withdrawalOkx);
  const groups = [];
  for (let i = 0; i < starkMnemonics.length; i += General.threads_counter) {
    groups.push(starkMnemonics.slice(i, i + General.threads_counter));
  }

  for (const group of groups) {
    const promises = [];
    
    for (const starkMnemonic of group) {

      const mmMnemonic = mmMnemonics.shift();
      const okecxKey = okecx.shift();
      const StarlnetOkx = withdrawalAddressOkx.shift()
      const workerInstance = new Workers(mmMnemonic, starkMnemonic, okecxKey, addressIndex,StarlnetOkx);
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
