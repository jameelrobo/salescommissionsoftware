using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class Factory
    {
        public Factory()
        {
            CommissionRules = new HashSet<CommissionRules>();
            SalesTrasaction = new HashSet<SalesTrasaction>();
        }

        public long FactoryId { get; set; }
        public long FactoryCategoryId { get; set; }
        public string FactoryName { get; set; }
        public string Princcode { get; set; }
        public decimal CommissionRate { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }

        public virtual FactoryCategory FactoryCategory { get; set; }
        public virtual ICollection<CommissionRules> CommissionRules { get; set; }
        public virtual ICollection<SalesTrasaction> SalesTrasaction { get; set; }
    }
}
