using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class SalesPerson
    {
        public SalesPerson()
        {
            SalesTrasaction = new HashSet<SalesTrasaction>();
        }

        public long SalesId { get; set; }
        public string SalesPersonName { get; set; }
        public string SalesPersonDesignation { get; set; }
        public string SalesPersonEmailId { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string SalesPersonAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string FaxNo { get; set; }
        public string Territory { get; set; }
        public string PrincCode { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<SalesTrasaction> SalesTrasaction { get; set; }
    }
}
