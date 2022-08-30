using BarcoSales.EFModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.Repository
{
   public interface IFactoryCategory
    {

        IEnumerable<Factorycategory> IGetFactoryCategory();
        Factorycategory IGetFactoryCategoryById(int id);
        Factorycategory IAddFactoryCategory(Factorycategory factoryCategory);
        Factorycategory IUpdateFactoryCategory(Factorycategory factoryCategory);
        Factorycategory IDeleteFactoryCategory(int id);
 Factorycategory IGetFactoryCategoryforDll(string connString);
    }
}
