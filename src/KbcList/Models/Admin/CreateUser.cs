using System.ComponentModel.DataAnnotations;

namespace KbcList.Models.Admin
{
    public class CreateUser
    {
        [Required]      
        [Display(Name="Nom")]  
        public string Name { get; set; }       
        [Required]        
        public string Email { get; set; }        
        [Required]      
        [Display(Name="Mot de passe")]    
        public string Password { get; set; }
    }
}
