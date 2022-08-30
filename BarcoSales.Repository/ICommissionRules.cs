using BarcoSales.EFModel;

using System;
using System.Collections.Generic;
using System.Text;

namespace BarcoSales.Repository
{
  public  interface ICommissionRules
    {

        // IEnumerable<Commissionrules> IGetCommissionRules();
      string IGetCommissionRules(string connString,int id);
        Commissionrules IGetCommissionRulesById(int id);
        Commissionrules IAddCommissionRules(Commissionrules commissionRules);
        Commissionrules IUpdateCommissionRules(Commissionrules commissionRules);
        Commissionrules IDeleteCommissionRules(int id);

    }
}
