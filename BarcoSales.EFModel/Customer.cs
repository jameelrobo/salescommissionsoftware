using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Customer
    {
        public long CustId { get; set; }
        public string CustomerName { get; set; }
        public string CustAliasName { get; set; }
        public string EmailId { get; set; }
        public string BranchName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Contact { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Territory { get; set; }
        public long? FactoryId { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
        public long? SalesmanId { get; set; }
        public decimal? CustomSalesCommRate { get; set; }
        public string CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
