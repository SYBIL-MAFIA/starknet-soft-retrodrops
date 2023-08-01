import fs from 'fs/promises';
import Workers from './utils/workers.js';
import { General } from './setting/config.js';
import path from 'path';

const loadFile = async (filePath) => {
  try {
    const absolutePath = path.resolve(filePath); 
    const data = await fs.readFile(absolutePath, 'utf-8');
    return data.trim().split('\n');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error; 
  }
};


const main = async () => {
  let addressIndex = 0; 
    
  const mmKeys =  await loadFile('./data/mm_keys.txt');
  const starkKeys = await loadFile('./data/stark_keys.txt');
  const okecx = await loadFile('./data/okx_addresses.txt');
  const withdrawalAddressOkx = await loadFile('./data/okxStarknetWithdrawal.txt')
  
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
