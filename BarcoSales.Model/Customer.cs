using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class Customer
    {
        public Customer()
        {
            CommissionRules = new HashSet<CommissionRules>();
            SalesTrasaction = new HashSet<SalesTrasaction>();
        }

        public long CustId { get; set; }
        public string CustName { get; set; }
        public string CustCompanyName { get; set; }
        public string CustCompanyCode { get; set; }
        public string CustEmailId { get; set; }
        public string CustAddress { get; set; }
        public string CustCity { get; set; }
        public string CustState { get; set; }
        public string CustZip { get; set; }
        public string CustContactPerson { get; set; }
        public string CustMobileNo { get; set; }
        public string CustPhoneNo { get; set; }
        public string CustFaxNo { get; set; }
        public string CustTerritory { get; set; }
        public string CustPrincCode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<CommissionRules> CommissionRules { get; set; }
        public virtual ICollection<SalesTrasaction> SalesTrasaction { get; set; }
    }
}
