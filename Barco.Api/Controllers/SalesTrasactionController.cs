using BarcoSales.Repository;
using BarcoSales.EFModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Barco.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class SalesTrasactionController : ControllerBase
    {
        private readonly ISalesTrasaction salesTrasactionService;
        private IConfiguration Configuration;
        
   
        public SalesTrasactionController(ISalesTrasaction IsalesTrasactionService, IConfiguration _configuration)
        {
            Configuration = _configuration;
            salesTrasactionService = IsalesTrasactionService;

        }
     
        [HttpGet]
        [Route("[action]")]
        [Route("api/Trasaction/GetTrasaction")]
        public string GetTrasaction()
        {
            try
            {

          
            string connString = this.Configuration.GetConnectionString("ContosoConnection");
            return salesTrasactionService.IGetSalesTrasaction(connString);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        [HttpPost]
        [Route("[action]")]
        [Route("api/Trasaction/AddTrasaction")]
        public Salestrasaction AddTrasaction(Salestrasaction salesTrasaction)
        {
            try
            {

          

            return salesTrasactionService.IAddSalesTrasaction(salesTrasaction);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Route("api/Trasaction/EditTrasaction")]
        public Salestrasaction EditTrasaction(Salestrasaction salesTrasaction)
        {
            try
            {

           
            return salesTrasactionService.IUpdateSalesTrasaction(salesTrasaction);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/Trasaction/DeleteTrasaction")]
        public Salestrasaction DeleteTrasaction(int id)
        {
            try
            {
 
            return salesTrasactionService.IDeleteSalesTrasaction(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        
    }
}
