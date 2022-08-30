using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Factory
    {
        public long FactoryId { get; set; }
        public long? FactoryCategoryId { get; set; }
        public string FactoryName { get; set; }
        public string PrincCode { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
