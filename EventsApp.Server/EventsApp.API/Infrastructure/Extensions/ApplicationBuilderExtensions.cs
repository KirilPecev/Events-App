namespace EventsApp.API.Infrastructure.Extensions
{
    using Data;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder appBuilder)
        {
            using IServiceScope services = appBuilder.ApplicationServices.CreateScope();

            EvenityDbContext dbContext = services.ServiceProvider.GetService<EvenityDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
