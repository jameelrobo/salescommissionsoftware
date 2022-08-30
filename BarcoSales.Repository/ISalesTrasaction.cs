using BarcoSales.EFModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.Repository
{
    public interface ISalesTrasaction
    {
        string IGetSalesTrasaction(string connString);
     
        Salestrasaction IGetSalesTrasactionById(int id);
        Salestrasaction IAddSalesTrasaction(Salestrasaction salesTrasaction);
        Salestrasaction IUpdateSalesTrasaction(Salestrasaction salesTrasaction);
        Salestrasaction IDeleteSalesTrasaction(int id);

    }
}
