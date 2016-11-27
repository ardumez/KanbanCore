using System.ComponentModel.DataAnnotations;

namespace KbcList.Models.Admin
{
    public class CreateUser
    {
        [Required]        
        public string Name { get; set; }       
        [Required]        
        public string Email { get; set; }        
        [Required]        
        public string Password { get; set; }
    }
}
