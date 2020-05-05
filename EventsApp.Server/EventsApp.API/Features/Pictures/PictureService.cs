namespace EventsApp.API.Features.Pictures
{
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class PictureService : IPictureService
    {
        public Task<IEnumerable<PictureListingServiceModel>> GetByUser(string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> Add(byte[] picture, string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(int id, string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}
