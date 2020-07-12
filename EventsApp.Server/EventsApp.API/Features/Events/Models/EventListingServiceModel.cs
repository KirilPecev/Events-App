namespace EventsApp.API.Features.Events.Models
{
    public class EventListingServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Sport { get; set; }

        public string Location { get; set; }

        public string Date { get; set; }

        public string Time { get; set; }

        public int AvailablePositions { get; set; }

        public string Creator { get; set; }

        public bool IsSportEvent { get; set; }
    }
}
