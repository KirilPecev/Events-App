namespace EventsApp.API.Data.EntityTypeConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
    using Models;

    public class PublicationEntityTypeConfiguration : IEntityTypeConfiguration<Publication>
    {
        public void Configure(EntityTypeBuilder<Publication> builder)
        {
            var converter = new EnumToNumberConverter<PublicationTypes, int>();

            builder
                .Property(p => p.Type)
                .HasConversion(converter);

            builder
                .HasQueryFilter(p => !p.IsDeleted);
        }
    }
}
