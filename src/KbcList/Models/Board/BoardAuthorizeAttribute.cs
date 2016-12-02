using Microsoft.AspNetCore.Authorization;
using KbcList.Models.Admin;

namespace KbcList.Models.Board
{
    public class BoardAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly IKbcUserManager kbcUserManager;

        public BoardAuthorizeAttribute(IKbcUserManager kbcUserManager)
        {
            this.kbcUserManager = kbcUserManager;
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var authorized = base.AuthorizeCore(httpContext);
            
            if (!authorized)
            {
                return false;
            }

            var rd = httpContext.Request.RequestContext.RouteData;

            var id = rd.Values["id"];
            var userName = httpContext.User.Identity.GetUserId();

            Submission submission = unit.SubmissionRepository.GetByID(id);
            User user = unit.UserRepository.GetByUsername(userName);

            rd.Values["model"] = submission;

            return submission.UserID == user.UserID;
        }
    }   
}