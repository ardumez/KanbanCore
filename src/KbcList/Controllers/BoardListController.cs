using Microsoft.AspNetCore.Mvc;

namespace KbcList.Controllers
{
    public class BoardListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
