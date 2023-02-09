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

   public int IActiveTransaction(string cnn, Int64 TId)
        {


            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {


                    //string cmdText = "INSERT INTO localpsaleman(SalesmanCode) VALUES (@SalesmanCode)";
                    string cmdText = "CALL sp_ActiveTransaction(@TId)";
                   // cmd.CommandText = "CALL sp_SearchTransactionInfoDatewise21(@start_date,@end_date,@IsDatewise)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@TId", TId);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                    return result;

                }
                catch (Exception ex)
                {
                    return 0;
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }



        }
        public int IDeActiveTransaction(string cnn, Int64 TId)
        {


            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {


                    //string cmdText = "INSERT INTO localpsaleman(SalesmanCode) VALUES (@SalesmanCode)";
                    string cmdText = "CALL sp_DeActiveTransaction(@TId)";
                   // cmd.CommandText = "CALL sp_SearchTransactionInfoDatewise21(@start_date,@end_date,@IsDatewise)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@TId", TId);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                    return result;

                }
                catch (Exception ex)
                {
                    return 0;
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }



        }
        private void insertMultsalesvalu(string cnn, string scode)
        {


            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {
                    string cmdText = "INSERT INTO localpsaleman(SalesmanCode) VALUES (@SalesmanCode)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@SalesmanCode", scode);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                }
                catch (Exception ex)
                {
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }



        }
 private void insertMultCustsvalu(string cnn, string scode)
        {


            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {
 
                    string cmdText = "INSERT INTO localcust(CustId) VALUES (@CustId)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@CustId", scode);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                }
                catch (Exception ex)
                {
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }



        }
        private void insertMultYearsvalu(string cnn, string Years)
        {


            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {
                    string cmdText = "INSERT INTO localyears(Years) VALUES (@Years)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@Years", Years);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                }
                catch (Exception ex)
                {
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }


        }
        private void insertMultMonthsvalu(string cnn, string Months)
        {
            

            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {
                    string cmdText = "INSERT INTO localmonths(Months) VALUES (@Months)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@Months", Months);

                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                }
                catch (Exception ex)
                {
                    // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }



        }

        private void insertMultfactvalu(string cnn, string scode)
        {
          
            
            using (MySqlConnection connection = new MySqlConnection(cnn))
            {
                try
                {
                    string cmdText = "INSERT INTO localfactname(FactoryName) VALUES (@FactoryName)";
                    MySqlCommand cmd = new MySqlCommand(cmdText, connection);
                    cmd.Parameters.AddWithValue("@FactoryName", scode);
                   
                    connection.Open();
                    int result = cmd.ExecuteNonQuery();
                    //lblError.Text = "Data Saved";
                }
                catch (Exception ex )
                {
                   // MessageBox.Show("not entered");
                    //lblError.Text = ex.Message;
                }
            }


        }
        public string ISearchTransaction(TransactionSearchRequest transactionSearchRequest, string conn=null)
        {
            try
            {
                string startDate = "";
                string EndDate = "";
                Boolean custids=false;

              
                  startDate = transactionSearchRequest.StartDate.ToString("yyyy-MM-dd");
                      EndDate = transactionSearchRequest.EndDate.ToString("yyyy-MM-dd");

                //string factories = "";

                //string salesman = "";
                if(transactionSearchRequest.SelectedYears != null)
                { 
                if (transactionSearchRequest.SelectedYears.Length >0)
                {
                    for (int i = 0; i < transactionSearchRequest.SelectedYears.Length; i++)
                    {
                        insertMultYearsvalu(conn, transactionSearchRequest.SelectedYears[i]);


                    }
                }
                }
                if (transactionSearchRequest.SelectedMonths != null)
                {
                    if (transactionSearchRequest.SelectedMonths.Length > 0)
                    {
                        for (int i = 0; i < transactionSearchRequest.SelectedMonths.Length; i++)
                        {
                            insertMultMonthsvalu(conn, transactionSearchRequest.SelectedMonths[i]);

                        }
                    }
                }
                if (transactionSearchRequest.FactoryId != null)
                {

                    if (transactionSearchRequest.FactoryId.Length > 0)
                    {
                        for (int i = 0; i < transactionSearchRequest.FactoryId.Length; i++)
                        {
                            insertMultfactvalu(conn, transactionSearchRequest.FactoryId[i]);


                        }
                    }
                }
                if (transactionSearchRequest.SalesmId != null)
                {
                    if (transactionSearchRequest.SalesmId.Length > 0)
                    {
                        for (int i = 0; i < transactionSearchRequest.SalesmId.Length; i++)
                        {
                            insertMultsalesvalu(conn, transactionSearchRequest.SalesmId[i]);

                        }
                    }
                }
                if (transactionSearchRequest.CustIds != null)
                {
                    if (transactionSearchRequest.CustIds.Length > 0)
                    {
                        custids = true;
                        for (int i = 0; i < transactionSearchRequest.CustIds.Length; i++)
                        {
                            insertMultCustsvalu(conn, transactionSearchRequest.CustIds[i]);

                        }
                    }
                }

                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                //  cmd.CommandText = "CALL sp_SearchTransactionInfoDatewise(@start_date,@end_date,@factoryName,@salesman)";
               // cmd.CommandText = "CALL sp_SearchTransactionInfoDatewise(@start_date,@end_date)";
               cmd.CommandText = "CALL sp_SearchTransactionInfoDatewiseUpdated(@start_date,@end_date,@IsDatewise,@IsCustId)";


                var sqlParameters = new List<MySqlParameter>();
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@start_date", Value = startDate });
                sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.VarChar, ParameterName = "@end_date", Value = EndDate });
                 sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.Bool, ParameterName = "@IsDatewise", Value = transactionSearchRequest.IsDatewise });
                 sqlParameters.Add(new MySqlParameter { MySqlDbType = MySqlDbType.Bool, ParameterName = "@IsCustId", Value = custids });
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
        public string IGetTransactionCustomers(string conn)
        {
            try
            {

                // string conn = "server=53.180.62.50.host.secureserver.net;port=3306;database=bsadmin_BarcoSalesCommission;uid=bsadmin_sa;password=2c-DbD4x$7^(;";
                // string conn = "server=localhost;port=3306;database=barcosalescommission;uid=root;password=root";
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL sp_GetTransactionCustomers()";
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
                var IsExistsalesTrasaction = dbContext.Salestrasaction.FirstOrDefault(x => x.FinYear == salesTrasaction.FinYear
                && x.MonthName == salesTrasaction.MonthName && x.FactoryId == salesTrasaction.FactoryId
                && x.SoldToName == salesTrasaction.SoldToName
                && x.SoldToCity == salesTrasaction.SoldToCity && x.SoldToState == salesTrasaction.SoldToState);

                if (IsExistsalesTrasaction != null)
                {
                    IsExistsalesTrasaction.UpdatedDate = DateTime.Now;
                    IsExistsalesTrasaction.TotalSalesAmt = salesTrasaction.TotalSalesAmt;

                    IsExistsalesTrasaction.GrossCommAmt = salesTrasaction.GrossCommAmt;
                    IsExistsalesTrasaction.SalesmanCommAmt = salesTrasaction.SalesmanCommAmt;

                    dbContext.Entry(IsExistsalesTrasaction).State = EntityState.Modified;
                    dbContext.SaveChanges();
                    return salesTrasaction;
                }
                else
                {
                    if (salesTrasaction != null)
                    {
                        salesTrasaction.CreatedDate = DateTime.Now;
                        dbContext.Salestrasaction.Add(salesTrasaction);
                        dbContext.SaveChanges();
                        return salesTrasaction;
                    }
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
