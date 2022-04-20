const pool = require("../config/db");

module.exports = {
  getAdminByAdminEmail: (email, callBack) => {
    pool.query(
      `select * from admin where admin_email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          console.log("Entering here");  
          callBack(error);
        }
      
        return callBack(null, results[0]);
      }
    );
  },
};
