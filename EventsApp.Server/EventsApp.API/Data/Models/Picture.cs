namespace EventsApp.API.Data.Models
{
    public class Picture : BaseModel<int>
    {
        public string ImageUrl { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}
