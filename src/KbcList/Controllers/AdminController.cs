using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using KbcList.Models;
using KbcList.Models.Admin;

namespace KbcList.Controllers
{
    public class AdminController : Controller
    {
        private IKbcUserManager userManager;

        public AdminController(IKbcUserManager userManager)
        {
            this.userManager = userManager;
        }

        public IActionResult Index()
        {
            return View(userManager.Users);
        }

      
    }
}