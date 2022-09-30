using BarcoSales.EFModel;
using BarcoSales.EFModel.RequestModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.Repository
{
    public interface ISalesTrasaction
    {
        string IGetSalesTrasaction(string connString);  
        int IDeActiveTransaction(string connString,Int64 TId); 

        string ISearchTransaction(TransactionSearchRequest transactionSearchRequest, string connString=null);
     
        Salestrasaction IGetSalesTrasactionById(int id);
        Salestrasaction IAddSalesTrasaction(Salestrasaction salesTrasaction);
        Salestrasaction IUpdateSalesTrasaction(Salestrasaction salesTrasaction);
        Salestrasaction IDeleteSalesTrasaction(int id);

    }
}
