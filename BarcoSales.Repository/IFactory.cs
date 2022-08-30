using BarcoSales.EFModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.Repository
{
    public interface IFactory
    {

        IEnumerable<Factory> IGetFactory();
        string IGetFactoryInfo(string connString);
        Factory IGetFactoryById(int id);
        Factory IAddFactory(Factory factory);
        Factory IUpdateFactory(Factory factory);
        Factory IDeleteFactory(int id);

    }
}
