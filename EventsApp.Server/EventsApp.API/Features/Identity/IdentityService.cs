namespace EventsApp.API.Features.Identity
{
    using Microsoft.IdentityModel.Tokens;
    using Models;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    public class IdentityService : IIdentityService
    {
        public string GenerateJwtToken(string userId, string userEmail, string secret)
        {

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secret);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Email, userEmail),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }

        public Task<UserListingServiceModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<UserListingServiceModel> MineFriends(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddFriend(string userId, string friendId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveFriend(string userId, string friendId)
        {
            throw new NotImplementedException();
        }

        public Task<UserDetailsServiceModel> Details(string userId)
        {
            throw new NotImplementedException();
        }
    }
}
