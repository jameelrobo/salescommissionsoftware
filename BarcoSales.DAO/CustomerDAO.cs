using BarcoSales.Repository;
using BarcoSales.EFModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using MySql.Data.MySqlClient;
using System.Data;
using Newtonsoft.Json;
using BarcoSales.EFModel.ViewModel;
using System;

namespace BarcoSales.DAO
{
    public class CustomerDAO : ICustomerRepository
    {
        barcosalescommissionContext dbContext;
        public CustomerDAO(barcosalescommissionContext _db)
        {

            dbContext = _db;
        }
        public IEnumerable<Customer> IGetCustomer()
        {
            try
            {


                var custlist = dbContext.Customer.ToList();
                return custlist;
            }
            catch (System.Exception)
            {

                return null;
            }

        }
        public Customer IAddCustomer(Customer customerInfo)
        {
            try
            {


                if (customerInfo != null)
                {
                    dbContext.Customer.Add(customerInfo);
                    dbContext.SaveChanges();
                    return customerInfo;
                }
                else
                    return null;
            }
            catch (System.Exception)
            {

                return null;
            }

        }
        public Customer IGetCustomerById(int id)
        {
            try
            {


                var customerInfo = dbContext.Customer.FirstOrDefault(x => x.CustId == id);
                return customerInfo;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Customer IUpdateCustomer(Customer customerInfo)
        {
            try
            {

                dbContext.Entry(customerInfo).State = EntityState.Modified;
                dbContext.SaveChanges();
                return customerInfo;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Customer IDeleteCustomer(int id)
        {
            try
            {

                var customer = dbContext.Customer.FirstOrDefault(x => x.CustId == id);
                if (customer != null)
                {
                    dbContext.Entry(customer).State = EntityState.Deleted;
                    dbContext.SaveChanges();
                }

                return customer;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public string IGetCustomerInfo(string conn)
        {
            try
            {


                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL sp_GetCustomersInfo()";
                sql_conn.Open();
                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                DataTable dt = new DataTable();
                dt.Load(rdr);
                string Result = JsonConvert.SerializeObject(dt);
                sql_conn.Close();
                return Result;
            }
            catch (System.Exception)
            {

                return null;
            }


        }
        public string IsExistSalesmanInCustomer(string conn, int id)
        {
            try
            {
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL IsExistSalesmanInCustome(@id)";
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
            catch (System.Exception)
            {

                return null;
            }


        }
        public string IsExistCustomerInCommRules(string conn, int id)
        {
            try
            {
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL IsExistCustomerInCommRules(@id)";
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
            catch (System.Exception)
            {

                return null;
            }


        }
        public string IsExistCustomerInSalesTrasaction(string conn, int id)
        {
            try
            {
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL IsExistCustomerInSalesTrasaction(@id)";
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
            catch (System.Exception)
            {

                return null;
            }


        }
        public string IsExistFactoryIdInCommissionrules(string conn, int id)
        {
            try
            {
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL IsExistFactoryIdInCommissionrules(@id)";
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
            catch (System.Exception)
            {

                return null;
            }


        }
        public string IsExistFactoryIdInSalesTrasaction(string conn, int id)
        {
            try
            {
                MySqlConnection sql_conn = new MySqlConnection(conn);
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                cmd.CommandText = "CALL IsExistFactoryIdInSalesTrasaction(@id)";
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
            catch (System.Exception)
            {

                return null;
            }


        }

        public string IGetCustomerInfo(CustomerViewModel customerViewModel, string conn)
        {
            try
            {


                List<CustomerViewModel> custlist = new List<CustomerViewModel>();
                // var custlist = dbContext.Customer.ToList();
                // string conn = "server=localhost;port=3306;database=barcosalescommission;uid=root;password=root";
                MySqlConnection sql_conn = new MySqlConnection(conn);

                Factorycategory factorycategory = new Factorycategory();
                //Here is where it differs...instead of calling it as a stored procedure type I just run it as a typical //mysql query would call it
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                cmd.CommandText = "CALL sp_GetCustomersInfo()";

                //an out parameter
                //cmd.Parameters.AddWithValue(para1, MySqlDbType.Int32);
                //cmd.Parameters[para1].Direction = ParameterDirection.Output;

                //an in parameter 

                //cmd.Parameters.AddWithValue(para2, para_val);
                //cmd.Parameters[para2].Direction = ParameterDirection.Input;


                sql_conn.Open();

                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                DataTable dt = new DataTable();
                dt.Load(rdr);
                string customer;
                customer = JsonConvert.SerializeObject(dt);
                return customer;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }


        }
        //public string DataTableToJSONWithJSONNet(DataTable table)
        //{
        //    string JSONString = string.Empty;
        //    JSONString = JSONConvert.SerializeObject(table);
        //    return JSONString;
        //}


    }
}
