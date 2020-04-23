﻿namespace EventsApp.API.Data
{
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

        public DbSet<Picture> Pictures { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<Publication> Publications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
    }
}
