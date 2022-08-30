using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class SalesTrasaction
    {
        public long TrasactionId { get; set; }
        public long? InvoiceNo { get; set; }
        public long CustId { get; set; }
        public long SalesId { get; set; }
        public long FactoryId { get; set; }
        public long CommissionRulesId { get; set; }
        public string ShipToName { get; set; }
        public string ShipToAddress { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToState { get; set; }
        public decimal? ExtPrice { get; set; }
        public decimal GrossCommRate { get; set; }
        public decimal GrossCommAmt { get; set; }
        public decimal ActualCommAmt { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }

        public virtual Customer Cust { get; set; }
        public virtual Factory Factory { get; set; }
        public virtual SalesPerson Sales { get; set; }
    }
}
