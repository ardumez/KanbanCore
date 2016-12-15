using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using KbcList.Models.Admin;
using KbcList.Models;
using KbcList.Models.Users;

namespace KbcList.Controllers
{
    public class UsersController : Controller
    {
        private IKbcUserManager userManager;

        public UsersController(IKbcUserManager userManager)
        {
            this.userManager = userManager;
        }


        public IActionResult Index()
        {
            return View(new Dictionary<string, object>(){
                {"Placeholder", "Placeholder"}
            });
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
        
            if (ModelState.IsValid)
            {

                var result = await userManager.PasswordSignInAsync(model.Email, model.Password);
                if (result.Succeeded)
                {
          
                    return RedirectToAction("Index", "BoardList");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return View(model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

          public IActionResult Create() 
        {
            ViewData["Title"] = "Créer un compte Kbc List";
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUser model)
        {
            if (ModelState.IsValid)
            {
                User user = new User
                {
                    UserName = model.Name,
                    Email = model.Email
                };
                IdentityResult result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("Login");
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View(model);
        }
    }
}
