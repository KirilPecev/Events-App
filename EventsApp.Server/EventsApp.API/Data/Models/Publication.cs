﻿namespace EventsApp.API.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Publication;

    public class Publication : BaseModel<int>
    {
        public Publication()
        {
            this.Likes = new List<Like>();
            this.Shares = new List<Share>();
        }

        public PublicationTypes Type { get; set; }

        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public DateTime CreatedOn { get; set; }

        public string SharedById { get; set; }
        public User SharedBy { get; set; }

        public bool IsDeleted { get; set; }
        
        public ICollection<Like> Likes { get; set; }

        public ICollection<Share> Shares { get; set; }
    }
}
