using BarcoSales.EFModel;
using BarcoSales.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Barco.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CommissionRulesController : ControllerBase
    {
        private readonly ICommissionRules commissionRulesService;


        private IConfiguration Configuration;
        string connString = string.Empty;
        public CommissionRulesController(ICommissionRules iICommissionRules, IConfiguration _configuration)
        {

            Configuration = _configuration;
            commissionRulesService = iICommissionRules;

        }

        [HttpGet]
        [Route("[action]")]
        [Route("api/CommissionRules/GetCommissionRules")]
        public string GetCommissionRules(int id)
        {
            try
            {


                string connString = this.Configuration.GetConnectionString("ContosoConnection");

                return commissionRulesService.IGetCommissionRules(connString,id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPost]
        [Route("[action]")]
        [Route("api/CommissionRules/AddCommissionRules")]
        public Commissionrules AddCommissionRules(Commissionrules commissionRules)
        {
            try
            {


                return commissionRulesService.IAddCommissionRules(commissionRules);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpPut]
        [Route("[action]")]
        [Route("api/CommissionRules/EditCommissionRules")]
        public Commissionrules EditCommissionRules(Commissionrules commissionRules)
        {
            try
            {
                commissionRules.UpdatedDate = DateTime.Now;

                return commissionRulesService.IUpdateCommissionRules(commissionRules);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/CommissionRules/DeleteCommissionRules")]
        public Commissionrules DeleteCommissionRules(int id)
        {
            try
            {


                return commissionRulesService.IDeleteCommissionRules(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        //[HttpGet]
        //[Route("[action]")]
        //[Route("api/CommissionRules/GetCommissionRulesId")]
        //public Commissionrules GetCommissionRulesId(int id)
        //{
        //    try
        //    {


        //        return commissionRulesService.IGetCommissionRulesById(id);
        //    }

        //    catch (Exception ex)
        //    {
        //        //_logger.LogError(ex, "Some unknown error has occurred.");
        //        return null;
        //    }
        //}
    }
}
