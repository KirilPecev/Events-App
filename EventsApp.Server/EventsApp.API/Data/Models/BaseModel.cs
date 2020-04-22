namespace EventsApp.API.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class BaseModel<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
