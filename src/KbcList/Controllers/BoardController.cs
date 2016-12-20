using KbcList.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using KbcList.Models.BoardModels;
using System.Collections.Generic;

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
          //  Board board = dataContext.Query<Board>().Single(b => b.BoardID == boardID);
            return View();
        }

        [HttpGet]
        public IEnumerable<Board> GetAll()
        {
            return new List<Board>(){
                new Board(){
                    BoardID = 1,
                    BoardName = "titre 1",
                    Items = new List<BoardItem>() {
                        new BoardItem() {
                            BoardItemID = 1,
                            Title = "titre 1",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 2,
                            Title = "titre 2",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 3,
                            Title = "titre 3",
                            Position = 1
                        }
                    }
                }, new Board(){
                    BoardID = 2,
                    BoardName = "titre 2",
                    Items = new List<BoardItem>() {
                        new BoardItem() {
                            BoardItemID = 4,
                            Title = "titre 4",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 5,
                            Title = "titre 5",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 6,
                            Title = "titre 6",
                            Position = 1
                        }
                    }
                }, new Board(){
                    BoardID = 2,
                    BoardName = "titre 2",
                    Items = new List<BoardItem>() {
                        new BoardItem() {
                            BoardItemID = 7,
                            Title = "titre 7",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 8,
                            Title = "titre 8",
                            Position = 1
                        },
                        new BoardItem() {
                            BoardItemID = 9,
                            Title = "titre 9",
                            Position = 1
                        }
                    }
                }
            }; 
        } 
    }
}
