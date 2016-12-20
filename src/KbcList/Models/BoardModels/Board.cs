using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KbcList.Models.BoardModels
{
    public class Board
    {
        [Key]
        public int BoardID { get; set; }

        public string BoardName { get; set; }

        public virtual List<BoardItem> Items { get; set; }
    }
}