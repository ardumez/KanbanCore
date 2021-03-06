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
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          
            services.AddDbContext<AppIdentityDbContext>(options =>                              
                options.UseSqlServer(Configuration["ConnectionStrings:KbcList"]));

            services.AddIdentity<User, IdentityRole>(opt => 
                opt.Cookies.ApplicationCookie.LoginPath = "/"
                ).AddEntityFrameworkStores<AppIdentityDbContext>();

            // Add framework services.
            services.AddMvc();

            services.AddTransient<IKbcUserManager, KbcUserManager>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, AppIdentityDbContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

                Console.WriteLine("En developement");
            if (env.IsDevelopment())
            {
                Console.WriteLine("En developement");
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
