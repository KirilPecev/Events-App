namespace EventsApp.API.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class EvenityDbContext : IdentityDbContext
    {
        public EvenityDbContext(DbContextOptions<EvenityDbContext> options)
            : base(options)
        {
        }
    }
}
