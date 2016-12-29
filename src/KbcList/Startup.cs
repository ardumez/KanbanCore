using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using KbcList.Models;
using KbcList.Models.Admin;
using KbcList.Models.Users;
using KbcList.Models.Database;

namespace KbcList
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Console.WriteLine($"appsettings.{env.EnvironmentName}.json");
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<AppIdentityDbContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:KbcList"]));
            Console.WriteLine( Configuration["ConnectionStrings:KbcList"]);

            services.AddDbContext<DataContext>(options =>                              
                options.UseSqlServer(Configuration["ConnectionStrings:KbcList"]));

            services.AddIdentity<User, IdentityRole>(opt =>
                opt.Cookies.ApplicationCookie.LoginPath = "/"
                ).AddEntityFrameworkStores<AppIdentityDbContext>();

            // Add framework services.
            services.AddMvc();

            services.AddTransient<IKbcUserManager, KbcUserManager>();


            services.Configure<IdentityOptions>(options =>
              {
                    // Password settings
                    options.Password.RequireDigit = false;
                  options.Password.RequiredLength = 4;
                  options.Password.RequireNonAlphanumeric = false;
                  options.Password.RequireUppercase = false;
                  options.Password.RequireLowercase = false;
              });

            services.AddTransient<IDataContext, DataContext>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, AppIdentityDbContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
