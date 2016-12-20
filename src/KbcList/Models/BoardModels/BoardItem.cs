using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KbcList.Models.BoardModels
{
    public class BoardItem
    {
        [Key]
        public int BoardItemID { get; set; }

        public string Title { get; set; }

        public int Position { get; set; }
    }
}