namespace EventsApp.API.Features.Pictures
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPictureService
    {
        Task<IEnumerable<PictureListingServiceModel>> GetByUser(string userId);

        Task<int> Add(byte[] picture, string userId);

        Task<bool> Delete(int id, string userId);
    }
}
