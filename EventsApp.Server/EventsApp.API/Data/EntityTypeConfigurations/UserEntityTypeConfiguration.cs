namespace EventsApp.API.Data.EntityTypeConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
    using Models;

    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var converter = new EnumToNumberConverter<Gender, int>();

            builder
                .Property(p => p.Gender)
                .HasConversion(converter);
        }
    }
}
