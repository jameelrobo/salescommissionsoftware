using System;
using System.Collections.Generic;

namespace BarcoSales.EFModel
{
    public partial class Salesman
    {
        public int SalesmId { get; set; }
        public string SalesmanCode { get; set; }
        public string SalesmanName { get; set; }
        public string Designation { get; set; }
        public decimal? CommissionRate { get; set; }
        public string EmailId { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Mobile { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public bool? IsActive { get; set; }
    }
}
