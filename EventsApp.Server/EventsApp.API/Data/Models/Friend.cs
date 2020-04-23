namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Friend
    {
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

        [Required]
        public string FriendId { get; set; }
        public User UserFriend { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
