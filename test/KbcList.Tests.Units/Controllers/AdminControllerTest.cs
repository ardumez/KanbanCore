using KbcList.Controllers;
using Xunit;
using KbcList.Models.Admin;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using KbcList.Models;
using System.Threading.Tasks;

namespace KbcList.Tests.Units.Controllers
{

    public class AdminControllerTest
    {
        [Fact]
        public void AdminController_Create_AddUserWithCorrectCreation()
        {
            // Arrange
            var kbcUserManager = new Mock<IKbcUserManager>();
            kbcUserManager
                .Setup(um => um.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
                .Returns(Task.FromResult(IdentityResult.Success));

            var controller = new AdminController(kbcUserManager.Object);
           
            // Act
            var result = controller.Create(new CreateUser(){
                Name = "Name",
                Email = "Email",
                Password = "Password"
            }).Result;

            // Assert
            Assert.Equal("Index", ((RedirectToActionResult)result).ActionName);
        }
    }
}