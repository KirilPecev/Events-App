namespace EventsApp.API.Data
{
    using EntityTypeConfigurations;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class EvenityDbContext : IdentityDbContext<User>
    {
        public EvenityDbContext(DbContextOptions<EvenityDbContext> options)
            : base(options) { }

        public DbSet<Event> Events { get; set; }

        public DbSet<Friend> Friends { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<Publication> Publications { get; set; }

        public DbSet<Like> Likes { get; set; }

        public DbSet<Share> Shares { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new EventEntityTypeConfiguration());
            builder.ApplyConfiguration(new PositionEntityTypeConfiguration());
            builder.ApplyConfiguration(new UserEntityTypeConfiguration());
            builder.ApplyConfiguration(new FriendEntityTypeConfiguration());
            builder.ApplyConfiguration(new PublicationEntityTypeConfiguration());
            builder.ApplyConfiguration(new LikeEntityTypeConfiguration());
            builder.ApplyConfiguration(new ShareEntityTypeConfiguration());

            base.OnModelCreating(builder);
        }
    }
}
