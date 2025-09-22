import osUtil from "os-utils";

const INTERVAL = 1000;

export const getSystemInfo = () => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = await getRamUsage();
    console.log({ cpuUsage, ramUsage });
    
  }, INTERVAL);
};
    
const getCpuUsage = () => {
  return new Promise((resolve) => {
    osUtil.cpuUsage(resolve);
  });
};

const getRamUsage = () => {
  return new Promise((resolve) => {
    resolve(1 - osUtil.freememPercentage());
  });
};
