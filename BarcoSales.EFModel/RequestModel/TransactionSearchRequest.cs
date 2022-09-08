using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.EFModel.RequestModel
{
    public class TransactionSearchRequest
    {
      public  DateTime StartDate  ;
      public DateTime EndDate  ;
      public int FactoryId = 0;
      public int SalesmId = 0;
    }
}
