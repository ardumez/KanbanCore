using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace KbcList.Models.Database
{
    public class DataContext : DbContext
    {
         public DbSet<Blog> Blogs { get; set; }
    }
}