namespace EventsApp.API.Data.Models
{
    public class Friend
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string FriendId { get; set; }
        public User UserFriend { get; set; }

        public FriendStatus Status { get; set; }
    }
}
