namespace EventsApp.API.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using static ValidationConstants.Event;

    public class Event : BaseModel<int>
    {
        public Event()
        {
            this.Positions = new List<Position>();
        }

        [Required]
        [MaxLength(NameMaxLength)]
        [MinLength(NameMinLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(SportMaxLength)]
        [MinLength(SportMinLength)]
        public string Sport { get; set; }

        [Required]
        [MinLength(LocationMinLength)]
        public string Location { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public bool IsSportEvent { get; set; }

        public bool IsDeleted { get; set; }

        public ICollection<Position> Positions { get; set; }
    }
}
