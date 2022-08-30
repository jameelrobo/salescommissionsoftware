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
     public class FactoryCategoryController : ControllerBase
    {
        private readonly IFactoryCategory factoryCategoryService;
        public FactoryCategoryController(IFactoryCategory iFactoryCategory)
        {
            factoryCategoryService = iFactoryCategory;
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/FactoryCategory/GetFactoryCategory")]
        public IEnumerable<FactoryCategory> GetFactoryCategory()
        {
            return factoryCategoryService.IGetFactoryCategory();
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/FactoryCategory/AddFactoryCategory")]
        public FactoryCategory AddFactoryCategory(FactoryCategory factoryCategory)
        {
            return factoryCategoryService.IAddFactoryCategory(factoryCategory);
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/FactoryCategory/EditFactoryCategory")]
        public FactoryCategory EditFactoryCategory(FactoryCategory factoryCategory)
        {
            return factoryCategoryService.IUpdateFactoryCategory(factoryCategory);
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/FactoryCategory/DeleteFactoryCategory")]
        public FactoryCategory DeleteFactoryCategory(int id)
        {
            return factoryCategoryService.IDeleteFactoryCategory(id);
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/FactoryCategory/GetFactoryCategoryId")]
        public FactoryCategory GetFactoryCategoryId(int id)
        {
            return factoryCategoryService.IGetFactoryCategoryById(id);
        }
    }
}
