const pool = require("../config/db");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(user_name, user_email, user_password, package_id) 
                values(?,?,?,?)`,
      [
        data.user_name,
        data.user_email,
        data.user_password,
        data.package_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
    
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where user_email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserDetailsAfterLogin: (id, callBack) => {
    pool.query(
      `select user_id as userId, user_name as userName, user_email as userEmail, sp.name as packageName, sp.type as packageType
        from users inner join subscription_package sp on users.package_id = sp.package_id
        where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
