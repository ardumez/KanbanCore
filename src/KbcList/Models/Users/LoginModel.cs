using System.ComponentModel.DataAnnotations;
namespace KbcList.Models.Users
{
  public class LoginModel
  {
        [Required]        
        public string Email { get; set; }        
        [Required]      
        [Display(Name="Mot de passe")]    
        public string Password { get; set; }
  }
}