namespace EventsApp.API.Data.EntityTypeConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;

    public class FriendEntityTypeConfiguration : IEntityTypeConfiguration<Friend>
    {
        public void Configure(EntityTypeBuilder<Friend> builder)
        {
            builder
                .HasKey(key => new { key.UserId, key.FriendId });

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.MainUserFriends)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(x => x.UserFriend)
                .WithMany(x => x.Friends)
                .HasForeignKey(x => x.FriendId);
        }
    }
}
