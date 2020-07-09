namespace EventsApp.API.Features.Events.Models
{
    using System;

    public class EventDetailsServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Sport { get; set; }

        public string Location { get; set; }

        public DateTime DateTime { get; set; }

        public int AvailablePositions { get; set; }

        public string CreatorId { get; set; }

        public string Creator { get; set; }

        public bool IsAdmin { get; set; }
    }
}
