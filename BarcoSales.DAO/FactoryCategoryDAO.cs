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

namespace BarcoSales.DAO
{
    public class FactoryCategoryDAO : IFactoryCategory
    {
        barcosalescommissionContext dbContext;
        public FactoryCategoryDAO(barcosalescommissionContext _db)
        {

            dbContext = _db;
        }
        public IEnumerable<Factorycategory> IGetFactoryCategory()
        {
            try
            {

                var custlist = dbContext.Factorycategory.ToList();
                return custlist;

            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }


        }
        public Factorycategory IAddFactoryCategory(Factorycategory factoryCategory)
        {
            try
            {


                if (factoryCategory != null)
                {
                    dbContext.Factorycategory.Add(factoryCategory);
                    dbContext.SaveChanges();
                    return factoryCategory;
                }
                return null;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Factorycategory IGetFactoryCategoryById(int id)
        {
            try
            {

                var factoryCategory = dbContext.Factorycategory.FirstOrDefault(x => x.FactoryCategoryId == id);
                return factoryCategory;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Factorycategory IUpdateFactoryCategory(Factorycategory factoryCategory)
        {
            try
            {

                dbContext.Entry(factoryCategory).State = EntityState.Modified;
                dbContext.SaveChanges();
                return factoryCategory;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Factorycategory IDeleteFactoryCategory(int id)
        {
            try
            {


                var factoryCategory = dbContext.Factorycategory.FirstOrDefault(x => x.FactoryCategoryId == id);
                dbContext.Entry(factoryCategory).State = EntityState.Deleted;
                dbContext.SaveChanges();
                return factoryCategory;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        public Factorycategory IGetFactoryCategoryforDll(string conn)
        {
            try
            {


                // string conn = "server=localhost;port=3306;database=barcosalescommission;uid=root;password=root";
                // string conn = "server=53.180.62.50.host.secureserver.net;port=3306;database=bsadmin_BarcoSalesCommission;uid=bsadmin_sa;password=2c-DbD4x$7^(;";
                MySqlConnection sql_conn = new MySqlConnection(conn);

                Factorycategory factorycategory = new Factorycategory();
                //Here is where it differs...instead of calling it as a stored procedure type I just run it as a typical //mysql query would call it
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = sql_conn;
                //  cmd.CommandText = "CALL storedprocname (@para1, @para2)";
                cmd.CommandText = "CALL GetAllfactorycategory()";

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

                string JSONresult = JsonConvert.SerializeObject(dt);
                //var factoryCategory = dbContext.Factorycategory.FirstOrDefault(x => x.FactoryCategoryId == id);
                //dbContext.Entry(factoryCategory).State = EntityState.Deleted;
                //dbContext.SaveChanges();
                return factorycategory;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

    }
}
