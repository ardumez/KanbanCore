using KbcList.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace KbcList.Controllers
{
    public class BoardController : Controller
    {
        private IDataContext dataContext;

        public BoardController(IDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public IActionResult Index(int userID)
        {
      
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
