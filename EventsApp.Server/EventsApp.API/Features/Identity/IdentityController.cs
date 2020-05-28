namespace EventsApp.API.Features.Identity
{
    using Data.Models;
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public IdentityController(UserManager<User> userManager, IOptions<AppSettings> appSettings, IIdentityService identityService)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            User user = new User()
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.Email
            };

            IdentityResult result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            User user = await this.userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            bool isPasswordValid = await this.userManager.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
            {
                return Unauthorized();
            }

            string token = this.identityService.GenerateJwtToken(user.Id, user.Email, this.appSettings.Secret);

            return new LoginResponseModel()
            {
                Token = token,
                UserId = user.Id
            };
        }

        [Authorize]
        [HttpGet]
        [Route(nameof(GetByName))]
        public async Task<IEnumerable<UserListingServiceModel>> GetByName(string name)
         => await this.identityService.GetByName(name);

        [Authorize]
        [HttpGet]
        [Route(nameof(Friends))]
        public async Task<IEnumerable<UserListingServiceModel>> Friends(string userId)
            => await this.identityService.AcceptedFriends(userId);


        [Authorize]
        [HttpGet]
        [Route(nameof(PendingFriends))]
        public async Task<IEnumerable<UserListingServiceModel>> PendingFriends()
        {
            string userId = this.User.GetId();

            return await this.identityService.PendingFriends(userId);
        }

        [Authorize]
        [HttpGet]
        [Route(Id)]
        public async Task<UserDetailsServiceModel> Details(string id)
            => await this.identityService.Details(id);

        [Authorize]
        [HttpGet]
        [Route(nameof(CreatedEventsCount))]
        public async Task<int> CreatedEventsCount(string userId)
            => await this.identityService.GetCreatedEventsAmountByUser(userId);


        [Authorize]
        [HttpPut]
        [Route(nameof(AddFriend))]
        public async Task<ActionResult> AddFriend(string friendId)
        {
            string userId = this.User.GetId();

            bool added = await this.identityService.AddFriend(userId, friendId);

            if (!added)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route(nameof(RemoveFriend))]
        public async Task<ActionResult> RemoveFriend(string friendId)
        {
            string userId = this.User.GetId();

            bool removed = await this.identityService.RemoveFriend(userId, friendId);

            if (!removed)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route(nameof(AcceptFriendship))]
        public async Task<ActionResult> AcceptFriendship(string friendId)
        {
            string userId = this.User.GetId();

            bool accepted = await this.identityService.AcceptFriendship(userId, friendId);

            if (!accepted)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route(nameof(UpdateUserInformation))]
        public async Task<ActionResult> UpdateUserInformation(UpdateUserRequestModel model)
        {
            string userId = this.User.GetId();

            bool updated = await this.identityService.UpdateUserInformation(model.Mobile, model.FacebookUrl, model.FavoriteSport, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
