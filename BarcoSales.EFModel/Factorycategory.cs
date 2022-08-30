using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Factorycategory
    {
        public long FactoryCategoryId { get; set; }
        public string FactoryCategoryName { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public long IsActive { get; set; }
    }
}
