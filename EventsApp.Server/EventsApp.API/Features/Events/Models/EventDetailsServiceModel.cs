namespace EventsApp.API.Features.Events.Models
{
    using System;

    public class EventDetailsServiceModel
    {
        public string Name { get; set; }

        public string Sport { get; set; }

        public string Location { get; set; }

        public DateTime DateTime { get; set; }

        public string CreatorId { get; set; }
    }
}
