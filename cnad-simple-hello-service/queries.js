let sql = {};

sql.cclh = {
  all: "Select * from cclh",
  byId: "Select * from cclh where id = ?",
  create: "insert into cclh values (?)",
  byName: "Select * from cclh where name like '% ? %'",
};

module.exports = sql;
