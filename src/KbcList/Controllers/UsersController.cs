using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using KbcList.Models.Admin;
using KbcList.Models;

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
                    return RedirectToAction("Index");
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
