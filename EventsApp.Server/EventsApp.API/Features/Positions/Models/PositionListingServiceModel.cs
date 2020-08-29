namespace EventsApp.API.Features.Positions.Models
{
    public class PositionListingServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ParticipantId { get; set; }

        public string Participant { get; set; }

        public bool CanQuit { get; set; }

        public bool CanJoin { get; set; }
    }
}
