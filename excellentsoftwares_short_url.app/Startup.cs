using es_url_shortner.service.IRepository;
using es_url_shortner.service.Repositories;
using es_url_shortner.service.Repository;
using excellentsoftwares_short_url.app.Migrations;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace excellentsoftwares_short_url.app
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public string myRoutingPolicies = "cors_policy";
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddDbContext<url_shortnerContext>(option => option.UseSqlServer(Configuration.GetConnectionString("conn")));
            services.AddTransient<IShortLink, Short_Link>();
            services.AddTransient<IQrService, QrService>();
            services.AddTransient<IUser, UserRepository>();
            services.AddTransient<ICaptcha, Captcha>();
            //services.AddMvc().AddSessionStateTempDataProvider();
            services.AddDistributedMemoryCache();
            services.AddSession(options => {
                options.Cookie.Name = ".Cookie";
                options.IdleTimeout = TimeSpan.FromMinutes(5);
               
            
                options.Cookie.IsEssential = true;
            });
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            //services.AddMvc();
            services.AddCors(option => {
                option.AddPolicy(myRoutingPolicies, policy => {
                   policy.AllowAnyOrigin().AllowAnyHeader().WithMethods("GET", "POST");
               });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseSession();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseCors(myRoutingPolicies);
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Values}/{action}/{id?}");
            });
            app.UseCors();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
