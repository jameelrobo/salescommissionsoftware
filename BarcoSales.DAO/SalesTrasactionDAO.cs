using BarcoSales.Repository;
using BarcoSales.EFModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;
using BarcoSales.EFModel.RequestModel;

namespace BarcoSales.DAO
{
    public class SalesTrasactionDAO : ISalesTrasaction
    {
        barcosalescommissionContext dbContext;
        public SalesTrasactionDAO(barcosalescommissionContext _db)
        {

            dbContext = _db;
        }
        //public IEnumerable<Salestrasaction> IGetSalesTrasaction()
        //{
        //    var salesTrasactions = dbContext.Salestrasaction.ToList();
        //    return salesTrasactions;


        //}
        public string ISearchTransaction(TransactionSearchRequest transactionSearchRequest, string conn=null)
        {
            try
            {
                string startDate = "";
                string EndDate = "";
              
                  startDate = transactionSearchRequest.StartDate.ToString("yyyy-MM-dd");
                      EndDate = transactionSearchRequest.EndDate.ToString("yyyy-MM-dd");

                string factories = "";

                string salesman = "";

                if(transactionSearchRequest.FactoryId.Length > 0)
                {
                    for(int i = 0; i < transactionSearchRequest.FactoryId.Length; i++)
                    {
                        if(i== transactionSearchRequest.FactoryId.Length-1)
                        {
                            factories =   factories + "'" + transactionSearchRequest.FactoryId[i].ToString() + "'";
                        }
                        else
                        {
                            factories = factories + "'" + transactionSearchRequest.FactoryId[i].ToString() + "',";
                        }
                    
                    }
                }

                if (transactionSearchRequest.SalesmId.Length > 0)
                {
                    for (int i = 0; i < transactionSearchRequest.SalesmId.Length; i++)
                    {
                        if(i== transactionSearchRequest.SalesmId.Length-1)
                        {
                            salesman = salesman + "'" + transactionSearchRequest.SalesmId[i].ToString()+"'";
                        }
                        else
                        {
                            salesman = salesman + "'" + transactionSearchRequest.SalesmId[i].ToString() + "'";
                        }
                    }
                }


                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                cmd.CommandText = "CALL sp_SearchTransactionInfoDatewise(@start_date,@end_date,@factoryName,@salesman)";

             
                var sqlParameters = new List<MySqlParameter>();
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.Int32, ParameterName = "@start_date", Value = startDate });
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.Int32, ParameterName = "@end_date", Value = EndDate });
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@factoryName", Value = factories });
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@salesman", Value = salesman });
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
       
        public string IGetSalesTrasaction(string conn)
        {
            try
            {

                // string conn = "server=53.180.62.50.host.secureserver.net;port=3306;database=bsadmin_BarcoSalesCommission;uid=bsadmin_sa;password=2c-DbD4x$7^(;";
                // string conn = "server=localhost;port=3306;database=barcosalescommission;uid=root;password=root";
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL sp_GetTransactionInfo()";
                sql_conn.Open();
                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                DataTable dt = new DataTable();
                dt.Load(rdr);

                string Result = JsonConvert.SerializeObject(dt);
                return Result;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        public Salestrasaction IAddSalesTrasaction(Salestrasaction salesTrasaction)
        {
            try
            {


                if (salesTrasaction != null)
                {
                    salesTrasaction.CreatedDate=DateTime.Now;
                    dbContext.Salestrasaction.Add(salesTrasaction);
                    dbContext.SaveChanges();
                    return salesTrasaction;
                }
                return null;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Salestrasaction IGetSalesTrasactionById(int id)
        {
            try
            {

                var salesTrasaction = dbContext.Salestrasaction.FirstOrDefault(x => x.TrasactionId == id);
                return salesTrasaction;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Salestrasaction IUpdateSalesTrasaction(Salestrasaction salesTrasaction)
        {
            try
            {

            
            dbContext.Entry(salesTrasaction).State = EntityState.Modified;
            dbContext.SaveChanges();
            return salesTrasaction;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Salestrasaction IDeleteSalesTrasaction(int id)
        {
            try
            {
 
            var salesTrasaction = dbContext.Salestrasaction.FirstOrDefault(x => x.TrasactionId == id);
            dbContext.Entry(salesTrasaction).State = EntityState.Deleted;
            dbContext.SaveChanges();
            return salesTrasaction;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
    }
}
