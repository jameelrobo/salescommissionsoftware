using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Barcosaleshistory
    {
        public long BarcoSalesId { get; set; }
        public long CustId { get; set; }
        public long SalesId { get; set; }
        public long FactoryId { get; set; }
        public string SoldToName { get; set; }
        public string SoldToCity { get; set; }
        public string SoldToState { get; set; }
        public string SoldToAddress { get; set; }
        public string ShipToName { get; set; }
        public string ShipToAddress { get; set; }
        public string ShipToCity { get; set; }
        public string ShipToState { get; set; }
        public decimal? ExtPrice { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public int FinYear { get; set; }
    }
}
