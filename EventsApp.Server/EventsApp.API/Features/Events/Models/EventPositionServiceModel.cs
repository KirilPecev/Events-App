namespace EventsApp.API.Features.Events.Models
{
    public class EventPositionServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Participant { get; set; }

        public bool CanQuit { get; set; }
    }
}
