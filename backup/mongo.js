/**
 * mongo备份
 */
const exec = require("child_process").exec;
const moment = require("moment");
const { enable, dblist, interval, expired } = require("./config.json").mongo;

// 整理备份 删除过期备份
const arrange = (oldDay, { database, output = "~/mongobackup" }) => {
  return new Promise((resolve, reject) => {
    exec(`ls ${output}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      const list = stdout.split("\n");
      list.forEach(foldername => {
        if (moment(foldername, "YYYY-MM-DD") < moment(oldDay, "YYYY-MM-DD")) {
          exec(`rm -rf ${output}/${foldername}`);
        }
      });
      resolve();
    });
  });
};

// 备份
const dump = (
  day,
  {
    database,
    user,
    password,
    host = "127.0.0.1:27017",
    output = "~/mongobackup"
  }
) => {
  return new Promise((resolve, reject) => {
    exec(
      `mongodump -h ${host} -d ${database} ${user && password
        ? `-u ${user} -p ${password} `
        : ``} -o ${output}/${day}`,
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

const backup = () => {
  const day = moment().format("YYYY-MM-DD");
  const oldDay = moment()
    .subtract(expired, "days")
    .format("YYYY-MM-DD");
  dblist.reduce((chain, db) => {
    return chain
      .then(() => dump(day, db))
      .then(() => arrange(oldDay, db))
      .catch(console.log);
  }, Promise.resolve());
  console.log("done");
};

exports.start = () => {
  if (enable === true) {
    backup();
    setInterval(backup, interval);
  } else {
    console.log("mongobackup is not enabled.");
  }
};
