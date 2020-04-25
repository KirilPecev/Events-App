namespace EventsApp.API.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Publication;

    public class Publication : BaseModel<int>
    {
        public Publication()
        {
            this.Likes = new List<Like>();
        }

        public PublicationTypes Type { get; set; }

        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public int Shares { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public ICollection<Like> Likes { get; set; }
    }
}
