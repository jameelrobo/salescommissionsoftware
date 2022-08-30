using BarcoSales.Repository;
using BarcoSales.EFModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Barco.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository customerService;
        private IConfiguration Configuration;

        public CustomerController(ICustomerRepository icustomer, IConfiguration _configuration)
        {
            Configuration = _configuration;
            customerService = icustomer;

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/GetCustomer")]
        public string GetCustomer()
        {
            try
            {


                string connString = this.Configuration.GetConnectionString("ContosoConnection");
                return customerService.IGetCustomerInfo(connString);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }

        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/IsExistSalesmanInCustomer")]
        public string IsExistSalesmanInCustomer(int id)
        {
            try
            {
                string connString = this.Configuration.GetConnectionString("ContosoConnection");
                
                return customerService.IsExistSalesmanInCustomer(connString, id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/IsExistCustomerInCommRules")]
        public string IsExistCustomerInCommRules(int id)
        {
            try
            {
                string connString = this.Configuration.GetConnectionString("ContosoConnection");

                return customerService.IsExistCustomerInCommRules(connString, id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/IsExistCustomerInSalesTrasaction")]
        public string IsExistCustomerInSalesTrasaction(int id)
        {
            try
            {
                string connString = this.Configuration.GetConnectionString("ContosoConnection");

                return customerService.IsExistCustomerInSalesTrasaction(connString, id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }

        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/IsExistFactoryIdInCommissionrules")]
        public string IsExistFactoryIdInCommissionrules(int id)
        {
            try
            {
                string connString = this.Configuration.GetConnectionString("ContosoConnection");

                return customerService.IsExistFactoryIdInCommissionrules(connString, id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/IsExistFactoryIdInSalesTrasaction")]
        public string IsExistFactoryIdInSalesTrasaction(int id)
        {
            try
            {
                string connString = this.Configuration.GetConnectionString("ContosoConnection");

                return customerService.IsExistFactoryIdInSalesTrasaction(connString, id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }

        [HttpPost]
        [Route("[action]")]
        [Route("api/Customer/AddCustomer")]
        public Customer AddCustomer(Customer customer)
        {
            try
            {


                return customerService.IAddCustomer(customer);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }

        [HttpPut]
        [Route("[action]")]
        [Route("api/Customer/EditCustomer")]
        public Customer EditCustomer(Customer customer)
        {
            try
            {


                return customerService.IUpdateCustomer(customer);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpDelete]
        [Route("[action]")]
        [Route("api/Customer/DeleteCustomer")]
        public Customer DeleteCustomer(int CId)
        {
            try
            {


                var result = customerService.IDeleteCustomer(CId);
                if (result != null)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }

        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/GetCustomerId")]
        public Customer GetCustomerId(int id)
        {
            try
            {


                return customerService.IGetCustomerById(id);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
        [HttpGet]
        [Route("[action]")]
        [Route("api/Customer/GetCustomerInfo")]
        public string GetCustomerInfo()
        {
            try
            {


                string connString = this.Configuration.GetConnectionString("ContosoConnection");
                return customerService.IGetCustomerInfo(connString);
            }

            catch (Exception ex)
            {
                //_logger.LogError(ex, "Some unknown error has occurred.");
                return null;
            }
        }
    }
}
