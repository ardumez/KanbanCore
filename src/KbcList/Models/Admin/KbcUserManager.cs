using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace KbcList.Models.Admin
{
    /// For unit test
    public interface IKbcUserManager
    {
        Task<IdentityResult> CreateAsync(User user, string password);

        IQueryable<User> Users { get; set; }

    }

    public class KbcUserManager : IKbcUserManager
    {
        private UserManager<User> userManager;

        public KbcUserManager(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public IQueryable<User> Users
        {
            get
            {
                return userManager.Users;
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public Task<IdentityResult> CreateAsync(User user, string password)
        {
          return userManager.CreateAsync(user, password);
        }
    }
}