using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace KBCList.Controllers
{
    public class UsersController : Controller
    {
        public UsersController()
        {

        }

        public IActionResult Index()
        {
            return View(new Dictionary<string, object>(){
                {"Placeholder", "Placeholder"}                    
            });
        }
    }
}
