using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace KbcList.Models.Users
{
    /// For unit test
    public interface IKbcUserManager
    {
        Task<IdentityResult> CreateAsync(User user, string password);

        Task<SignInResult> PasswordSignInAsync(string username, string password);

        IQueryable<User> Users { get; set; }

    }

    public class KbcUserManager : IKbcUserManager
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public KbcUserManager(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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

        public Task<SignInResult> PasswordSignInAsync(string username, string password)
        {
            return signInManager.PasswordSignInAsync(username, password, false, false);
        }

    }
}