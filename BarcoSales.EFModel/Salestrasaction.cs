using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Salestrasaction
    {
        public long TrasactionId { get; set; }
        public long? InvoiceNo { get; set; }
        public long? CustId { get; set; }
        public string SoldToName { get; set; }
        public string SoldToAddress { get; set; }
        public string SoldToState { get; set; }
        public long? SalesmId { get; set; }
        public string SalesmanName { get; set; }
        public long? FactoryId { get; set; }
        public long? CommissionRulesId { get; set; }
        public string ShipToName { get; set; }
        public string ShipToAddress { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToState { get; set; }
        public decimal? TotalSalesAmt { get; set; }
        public decimal? GrossCommRate { get; set; }
        public decimal? GrossCommAmt { get; set; }
        public decimal? SalesmanCommAmt { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
        public int FinYear { get; set; }
    }
}
