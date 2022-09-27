using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.EFModel.RequestModel
{
    public class TransactionSearchRequest
    {
        public DateTime StartDate;
        public DateTime EndDate;
        public string[] SelectedYears = null;
        public string[] SelectedMonths = null;
        public string[] FactoryId = null;
        public string[] SalesmId = null; 
        public bool IsDatewise = false;
    

       
    }
}
