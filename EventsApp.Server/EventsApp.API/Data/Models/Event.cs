namespace EventsApp.API.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Event : BaseModel<int>
    {
        public Event()
        {
            this.Positions = new List<Position>();
        }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Sport { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        [Required]
        public string CreatorId { get; set; }
        public User Creator { get; set; }

        public ICollection<Position> Positions { get; set; }
    }
}
