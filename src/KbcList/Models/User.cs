using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KBCList.Models
{
    public class User : IdentityUser 
    {
        public User()
        {
        }
    }
}
