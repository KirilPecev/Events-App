namespace EventsApp.API.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class EvenityDbContext : IdentityDbContext<User>
    {
        public EvenityDbContext(DbContextOptions<EvenityDbContext> options)
            : base(options)
        {
        }
    }
}
