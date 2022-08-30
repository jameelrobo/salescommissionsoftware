using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Salesperson
    {
        public Salesperson()
        {
           
        }

        public long SalesmanId { get; set; }
        public string Salesmancode { get; set; }
        public string Salesmanname { get; set; }
        public string Designation { get; set; }
        public string Emailid { get; set; }
        public DateTime? Joiningdate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Mobile { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }

      
    }
}
