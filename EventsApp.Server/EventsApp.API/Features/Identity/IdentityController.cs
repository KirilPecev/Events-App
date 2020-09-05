﻿namespace EventsApp.API.Features.Identity
{
    using System;
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
            Enum.TryParse(model.Gender, true, out Gender gender);
            
            User user = new User()
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.Email,
                Birthday = DateTime.Parse(model.Birthday),
                Gender = gender,
                ProfilePictureUrl = model.ProfilePictureUrl
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
                UserId = user.Id,
                FullName = user.ToString()
            };
        }

        [Authorize]
        [HttpGet]
        [Route("Users")]
        public async Task<IEnumerable<UserListingServiceModel>> GetAll()
         => await this.identityService.GetAllUsers();

        [Authorize]
        [HttpGet]
        [Route("Friends")]
        public async Task<IEnumerable<UserListingServiceModel>> GetFriends(string userId)
            => await this.identityService.AcceptedFriends(userId);


        [Authorize]
        [HttpGet]
        [Route("PendingFriends")]
        public async Task<IEnumerable<UserListingServiceModel>> GetPendingFriends()
        {
            string userId = this.User.GetId();

            return await this.identityService.PendingFriends(userId);
        }

        [Authorize]
        [HttpGet]
        [Route(Id)]
        public async Task<UserDetailsServiceModel> Details(string id)
            => await this.identityService.Details(id, this.User.GetId());

        [Authorize]
        [HttpGet]
        [Route("Events")]
        public async Task<int> GetCreatedEventsCount(string userId)
            => await this.identityService.GetCreatedEventsAmountByUser(userId);


        [Authorize]
        [HttpPut]
        [Route("Friend")]
        public async Task<ActionResult> AddFriend(AddFriendRequestModel model)
        {
            string userId = this.User.GetId();

            bool added = await this.identityService.AddFriend(userId, model.FriendId);

            if (!added)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route(nameof(RemoveFriendship))]
        public async Task<ActionResult> RemoveFriendship(string id)
        {
            string userId = this.User.GetId();

            bool removed = await this.identityService.RemoveFriend(userId, id);

            if (!removed)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("Accept")]
        public async Task<ActionResult> AcceptFriendship(AcceptFriendshipRequestModel model)
        {
            string userId = this.User.GetId();

            bool accepted = await this.identityService.AcceptFriendship(userId, model.FriendId);

            if (!accepted)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut]
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

        [Authorize]
        [HttpPut]
        [Route("Picture")]
        public async Task<ActionResult> UpdateProfilePicture(UploadProfilePictureRequestModel model)
        {
            string userId = this.User.GetId();

            bool updated = await this.identityService.UpdateProfilePicture(model.PictureUrl, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
