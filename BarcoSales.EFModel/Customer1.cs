using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Customer1
    {
        public string CustId { get; set; }
        public double? SalesmanId { get; set; }
        public string Avatar { get; set; }
        public string CreatedDate { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Contact { get; set; }
        public string Phone { get; set; }
        public string Branch { get; set; }
        public string EmailId { get; set; }
        public string Mobile { get; set; }
        public string Territory { get; set; }
        public int? FactoryId { get; set; }
        public int? CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int? IsActive { get; set; }
    }
}
