import scanDirEach from '@iyowei/scan-dir-each';
import lsDir from '@iyowei/ls-dir';

export default function scanDir(path, worker, raw = false) {
  if (Object.prototype.toString.call(worker) === "[object Function]") {
    return new Promise((resolve, reject) => {
      scanDirEach(path, worker, raw).then(
        (rslt) => {
          resolve(rslt);
        },
        (err) => {
          reject(rslt);
        }
      );
    });
  }

  return new Promise((resolve) => {
    lsDir(path).then(
      (rslt) => {
        resolve(rslt);
      },
      (err) => {
        reject(rslt);
      }
    );
  });
}
