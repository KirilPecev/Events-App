namespace EventsApp.API.Infrastructure.Extensions
{
    using Data;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
            => app
                .UseSwagger()
                .UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Evenity API V1");
                    c.RoutePrefix = string.Empty;
                });


        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using IServiceScope services = app.ApplicationServices.CreateScope();

            EvenityDbContext dbContext = services.ServiceProvider.GetService<EvenityDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
