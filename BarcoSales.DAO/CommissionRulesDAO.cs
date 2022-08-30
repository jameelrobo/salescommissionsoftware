using BarcoSales.Repository;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BarcoSales.EFModel;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;

namespace BarcoSales.DAO
{
    public class CommissionRulesDAO : ICommissionRules
    {

        barcosalescommissionContext dbContext;
        public CommissionRulesDAO(barcosalescommissionContext _db)
        {
            dbContext = _db;
        }
        //public IEnumerable<Commissionrules> IGetCommissionRules()
        //{
        //    var custlist = dbContext.Commissionrules.ToList();
        //    return custlist;
        //}
        public string IGetCommissionRules(string conn, int id = 0)
        {
            try
            {




                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                cmd.CommandText = "CALL sp_GetCommRules(@id)";

                //  //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                //  cmd.CommandText = "CALL GetAllfactorycategory()";

                //an out parameter
                //cmd.Parameters.AddWithValue(para1, MySqlDbType.Int32);
                //cmd.Parameters[para1].Direction = ParameterDirection.Output;

                //an in parameter 

                //cmd.Parameters.AddWithValue("@id", id);
                //cmd.Parameters[id].Direction = ParameterDirection.Input;
                var sqlParameters = new List<MySqlParameter>();
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.Int32, ParameterName = "@id", Value = id });

                cmd.Parameters.AddRange(sqlParameters.ToArray());
                sql_conn.Open();
                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                DataTable dt = new DataTable();
                dt.Load(rdr);

                string rules = JsonConvert.SerializeObject(dt);
                return rules;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Commissionrules IAddCommissionRules(Commissionrules commissionRules)
        {
            try
            {


                if (commissionRules != null)
                {
                    dbContext.Commissionrules.Add(commissionRules);
                    dbContext.SaveChanges();
                    return commissionRules;
                }
                return null;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Commissionrules IGetCommissionRulesById(int id)
        {
            try
            {


                var commissionRules = dbContext.Commissionrules.FirstOrDefault(x => x.CommissionRulesId == id);

                return commissionRules;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Commissionrules IUpdateCommissionRules(Commissionrules commissionRules)
        {
            try
            {


                dbContext.Entry(commissionRules).State = EntityState.Modified;
                dbContext.SaveChanges();
                return commissionRules;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Commissionrules IDeleteCommissionRules(int id)
        {
            try
            {
                var commissionRules = dbContext.Commissionrules.FirstOrDefault(x => x.CommissionRulesId == id);


             //   var commissionRules = dbContext.Commissionrules.FirstOrDefault(x => x.CommissionRulesId == id);
                if (commissionRules != null)
                {
                    dbContext.Entry(commissionRules).State = EntityState.Deleted;
                    dbContext.SaveChanges();
                }
                return commissionRules;


            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

    }
}