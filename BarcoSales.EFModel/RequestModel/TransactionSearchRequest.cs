using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.EFModel.RequestModel
{
    public class TransactionSearchRequest
    {
        public DateTime StartDate;
        public DateTime EndDate;
        public string[] FactoryId = null;
        public string[] SalesmId = null;
    }
}
