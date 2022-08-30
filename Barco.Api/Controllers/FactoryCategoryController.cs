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
    public class FactoryCategoryController : ControllerBase
    {
        private readonly IFactoryCategory factoryCategoryService;
        private IConfiguration Configuration;
        public FactoryCategoryController(IFactoryCategory iFactoryCategory, IConfiguration _configuration)
        {
            Configuration = _configuration;
            factoryCategoryService = iFactoryCategory;
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/FactoryCategory/GetFactoryCategory")]
        public IEnumerable<Factorycategory> GetFactoryCategory()
        {
            try
            {

                return factoryCategoryService.IGetFactoryCategory();
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/FactoryCategory/AddFactoryCategory")]
        public Factorycategory AddFactoryCategory(Factorycategory factoryCategory)
        {
            try
            {


                return factoryCategoryService.IAddFactoryCategory(factoryCategory);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/FactoryCategory/EditFactoryCategory")]
        public Factorycategory EditFactoryCategory(Factorycategory factoryCategory)
        {
            try
            {

                return factoryCategoryService.IUpdateFactoryCategory(factoryCategory);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/FactoryCategory/DeleteFactoryCategory")]
        public Factorycategory DeleteFactoryCategory(int id)
        {
            try
            {

                return factoryCategoryService.IDeleteFactoryCategory(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/FactoryCategory/GetFactoryCategoryId")]
        public Factorycategory GetFactoryCategoryId(int id)
        {
            try
            {

            
            return factoryCategoryService.IGetFactoryCategoryById(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/factoryCategory/GetCategory")]
        public Factorycategory GetFactoryCategoryforDll()
        {
            try
            {
 
            string connString = this.Configuration.GetConnectionString("ContosoConnection");
            return factoryCategoryService.IGetFactoryCategoryforDll(connString);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

    }
}
