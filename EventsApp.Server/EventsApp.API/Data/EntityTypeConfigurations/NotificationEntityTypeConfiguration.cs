namespace EventsApp.API.Data.EntityTypeConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class NotificationEntityTypeConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Ignore(n => n.Creator);

            builder
                .HasQueryFilter(p => !p.IsDeleted);
        }
    }
}
