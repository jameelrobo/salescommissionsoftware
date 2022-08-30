using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using BarcoSales.EFModel;
using BarcoSales.Repository;

using Npgsql;

using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace BarcoSales.DAO
{
    public class SalesPersonDAO : ISalesPersonRepository
    {

        barcosalescommissionContext dbContext;
        public SalesPersonDAO(barcosalescommissionContext _db)
        {
            dbContext = _db;
        }
        public IEnumerable<Salesman> IGetSalesPerson()
        {
            try
            {

                var salesmans = dbContext.Salesman.ToList();
                return salesmans;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        public Salesman IAddSalesPerson(Salesman salesman)
        {
            try
            {

                if (salesman != null)
                {
                    dbContext.Salesman.Add(salesman);
                    dbContext.SaveChanges();
                    return salesman;
                }
                return null;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Salesman IGetSalesPersonById(int id)
        {
            try
            {
 
            var salesman = dbContext.Salesman.FirstOrDefault(x => x.SalesmId == id);
            return salesman;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        public Salesman IUpdateSalesPerson(Salesman salesman)
        {
            try
            {
 
            dbContext.Entry(salesman).State = EntityState.Modified;
            dbContext.SaveChanges();
            return salesman;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        public Salesman IDeleteSalesPerson(int id)
        {
            try
            {

           
            var salesman = dbContext.Salesman.FirstOrDefault(x => x.SalesmId == id);
            dbContext.Entry(salesman).State = EntityState.Deleted;
            dbContext.SaveChanges();
            return salesman;
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
    }
}
