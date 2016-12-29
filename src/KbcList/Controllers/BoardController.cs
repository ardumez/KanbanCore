using KbcList.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using KbcList.Models.BoardModels;

namespace KbcList.Controllers
{

    public class BoardController : Controller

    {
        private IDataContext dataContext;

        public BoardController(IDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public IActionResult Index(int boardID)
        {
            Board board = dataContext.Query<Board>().Single(b => b.BoardID == boardID);
            return View();
        }

        public IActionResult Index2(int boardID)
        {
            Board board = dataContext.Query<Board>().Single(b => b.BoardID == boardID);
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
