import log from 'electron-log';

export const logTransaction = async (transaction: () => Promise<void>) => {
  log.buffering.begin();
  try {
    await transaction();
    log.buffering.reject();
  } catch (e) {
    log.buffering.commit();
    log.error(e);
    throw e;
  }
};
