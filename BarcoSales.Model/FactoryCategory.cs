using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace BarcoSales.Model
{
    public partial class FactoryCategory
    {
        public FactoryCategory()
        {
            Factory = new HashSet<Factory>();
        }

        public long FactoryCategoryId { get; set; }
        public string FactoryCategoryName { get; set; }
        public DateTime CreatedDate { get; set; }
        public long CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public long IsActive { get; set; }

        public virtual ICollection<Factory> Factory { get; set; }
    }
}
