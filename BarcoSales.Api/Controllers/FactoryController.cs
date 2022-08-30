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
    
    public class  FactoryController : ControllerBase
    {
        private readonly IFactory factoryService;
        public FactoryController(IFactory iFactory)
        {
            factoryService = iFactory;
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Factory/GetFactory")]
        public IEnumerable<Factory> GetFactory()
        {
            return factoryService.IGetFactory();
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/Factory/AddFactory")]
        public Factory AddFactory(Factory factory)
        {
            return factoryService.IAddFactory(factory);
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/Factory/EditFactory")]
        public Factory EditFactory(Factory factory)
        {
            return factoryService.IUpdateFactory(factory);
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/Factory/DeleteFactory")]
        public Factory DeleteFactory(int id)
        {
            return factoryService.IDeleteFactory(id);
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Factory/GetFactoryId")]
        public Factory GetFactoryId(int id)
        {
            return factoryService.IGetFactoryById(id);
        }
    }
}
