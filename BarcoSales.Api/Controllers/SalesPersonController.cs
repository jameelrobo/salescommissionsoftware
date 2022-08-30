using BarcoSales.Repository;
using BarcoSales.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barco.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SalesPersonController : ControllerBase
    {
        private readonly ISalesPersonRepository salesPersonService;
        public SalesPersonController(ISalesPersonRepository IsalesPerson)
        {
            salesPersonService = IsalesPerson;
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/SalesPerson/GetSalesPerson")]
        public IEnumerable<SalesPerson> GetSalesPerson()
        {
            return salesPersonService.IGetSalesPerson();
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/SalesPerson/AddSalesPerson")]
        public SalesPerson AddSalesPerson(SalesPerson salesPerson)
        {
            return salesPersonService.IAddSalesPerson(salesPerson);
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/SalesPerson/EditSalesPerson")]
        public SalesPerson EditSalesPerson(SalesPerson salesPerson)
        {
            return salesPersonService.IUpdateSalesPerson(salesPerson);
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/SalesPerson/DeleteSalesPerson")]
        public SalesPerson DeleteSalesPerson(int id)
        {
            return salesPersonService.IDeleteSalesPerson(id);
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/SalesPerson/GetSalesPersonId")]
        public SalesPerson GetSalesPersonId(int id)
        {
            return salesPersonService.IDeleteSalesPerson(id);
        }
    }
}
