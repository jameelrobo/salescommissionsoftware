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
    
    public class SalesTrasactionController : ControllerBase
    {
        private readonly ISalesTrasaction salesTrasactionService;
        public SalesTrasactionController(ISalesTrasaction IsalesTrasactionService)
        {
            salesTrasactionService = IsalesTrasactionService;

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Trasaction/GetTrasaction")]
        public IEnumerable<SalesTrasaction> GetTrasaction()
        {
            return salesTrasactionService.IGetSalesTrasaction();
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/Trasaction/AddTrasaction")]
        public SalesTrasaction AddCustomer(SalesTrasaction salesTrasaction)
        {

            return salesTrasactionService.IAddSalesTrasaction(salesTrasaction);
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/Trasaction/EditTrasaction")]
        public SalesTrasaction EditTrasaction(SalesTrasaction salesTrasaction)
        {
            return salesTrasactionService.IUpdateSalesTrasaction(salesTrasaction);
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/Trasaction/DeleteTrasaction")]
        public SalesTrasaction DeleteTrasaction(int id)
        {
            return salesTrasactionService.IDeleteSalesTrasaction(id);
        }
        
    }
}
