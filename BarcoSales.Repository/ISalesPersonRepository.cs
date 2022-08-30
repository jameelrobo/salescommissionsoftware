using BarcoSales.EFModel;
using System;
using System.Collections.Generic;
using System.Text;



namespace BarcoSales.Repository
{
    public interface ISalesPersonRepository
    {

        IEnumerable<Salesman> IGetSalesPerson();
        Salesman IGetSalesPersonById(int id);
        Salesman IAddSalesPerson(Salesman salesman);
        Salesman IUpdateSalesPerson(Salesman salesman);
        Salesman IDeleteSalesPerson(int id);
    }
}
