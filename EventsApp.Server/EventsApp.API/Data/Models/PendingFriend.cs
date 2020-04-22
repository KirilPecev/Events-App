namespace EventsApp.API.Data.Models
{
    public class PendingFriend
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string FriendId { get; set; }
        public User Friend { get; set; }
    }
}
