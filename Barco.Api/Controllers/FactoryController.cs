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
    
    public class  FactoryController : ControllerBase
    {
        private IConfiguration Configuration;
        private readonly IFactory factoryService;
        public FactoryController(IFactory iFactory, IConfiguration _configuration)
        {
            Configuration = _configuration;
            factoryService = iFactory;
        }
      

        [HttpGet]
        [Route("[action]")]
        [Route("api/Factory/GetFactory")]
        public string GetFactory()
        {
            try
            {

            
            string connString = this.Configuration.GetConnectionString("ContosoConnection");
            return factoryService.IGetFactoryInfo(connString);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        [HttpPost]
        [Route("[action]")]
        [Route("api/Factory/AddFactory")]
        public Factory AddFactory(Factory factory)
        {
            try
            {

           
            return factoryService.IAddFactory(factory);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/Factory/EditFactory")]
        public Factory EditFactory(Factory factory)
        {
            try
            {

         
            return factoryService.IUpdateFactory(factory);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/Factory/DeleteFactory")]
        public Factory DeleteFactory(int id)
        {
            try
            {
 
            return factoryService.IDeleteFactory(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Factory/GetFactoryId")]
        public Factory GetFactoryId(int id)
        {
            try
            {

            
            return factoryService.IGetFactoryById(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
    }
}
