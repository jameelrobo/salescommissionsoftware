using BarcoSales.Repository;
using BarcoSales.EFModel;
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
        public IEnumerable<Salesman> GetSalesPerson()
        {
            try
            {

         
            return salesPersonService.IGetSalesPerson();
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/SalesPerson/AddSalesPerson")]
        public Salesman AddSalesPerson(Salesman salesPerson)
        {
            try
            {

           
            return salesPersonService.IAddSalesPerson(salesPerson);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/SalesPerson/EditSalesPerson")]
        public Salesman EditSalesPerson(Salesman salesPerson)
        {
            try
            {

          
            return salesPersonService.IUpdateSalesPerson(salesPerson);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/SalesPerson/DeleteSalesPerson")]
        public Salesman DeleteSalesPerson(int id)
        {
            try
            {

           
            return salesPersonService.IDeleteSalesPerson(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/SalesPerson/GetSalesPersonId")]
        public Salesman GetSalesPersonId(int id)
        {
            try
            {
 
            return salesPersonService.IGetSalesPersonById(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
    }
}
