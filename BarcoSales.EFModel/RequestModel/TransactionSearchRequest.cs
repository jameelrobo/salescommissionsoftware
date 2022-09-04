using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.EFModel.RequestModel
{
    public class TransactionSearchRequest
    {
      public  DateTime? StartDate = null;
      public DateTime? EndDate = null;
      public int FactoryId = 0;
      public int SalesmId = 0;
    }
}
