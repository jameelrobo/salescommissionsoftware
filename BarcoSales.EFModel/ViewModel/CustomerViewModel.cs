using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.EFModel.ViewModel
{

    public class CustomerViewModel
    {
        public long Cid { get; set; }
        public string CustId { get; set; }
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
        public string FactoryName { get; set; }
        public string PrincCode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
        public long? SalesmanId { get; set; }
        public string SalesmanCode { get; set; }
        public string SalesmanName { get; set; }
    }
}
