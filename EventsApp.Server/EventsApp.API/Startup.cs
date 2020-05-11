namespace EventsApp.API
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddDatabase(this.Configuration)
                .AddIdentity()
                .AddJwtAuthentication(services.GetAppSettings(this.Configuration))
                .AddApplicationServices()
                .AddSwagger()
                .AddCors(options =>
                {
                    options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.WithOrigins("http://localhost:4200",
                                "https://localhost:44320")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
                })
                .AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDatabaseErrorPage();
            }

            app
                .UseSwaggerUI()
                .UseRouting()
                .UseCors(opt => opt
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
                .UseAuthentication()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                })
                .ApplyMigrations();
        }
    }
}
