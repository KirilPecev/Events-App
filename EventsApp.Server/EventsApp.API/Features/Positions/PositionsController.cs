namespace EventsApp.API.Features.Positions
{
    using Infrastructure;
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Authorize]
    public class PositionsController : ApiController
    {
        private readonly IPositionService positionService;

        public PositionsController(IPositionService positionService)
        {
            this.positionService = positionService;
        }

        [HttpPut]
        [Route(nameof(Join))]
        public async Task<ActionResult> Join(JoinPositionRequestModel model)
        {
            string userId = this.User.GetId();

            Result result = await this.positionService.Join(model.EventId, model.PositionId, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Unjoin))]
        public async Task<ActionResult> Unjoin(JoinPositionRequestModel model)
        {
            string userId = this.User.GetId();

            Result result = await this.positionService.Unjoin(model.EventId, model.PositionId, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Error);
            }

            return Ok();
        }

        [HttpGet]
        [Route(nameof(Available))]
        public async Task<IEnumerable<PositionListingServiceModel>> Available(int eventId)
        {
            string userId = this.User.GetId();

            return await this.positionService.GetAvailablePositions(eventId, userId);
        }

        [HttpGet]
        [Route(nameof(Busy))]
        public async Task<IEnumerable<PositionListingServiceModel>> Busy(int eventId)
        {
            string userId = this.User.GetId();

            return await this.positionService.GetBusyPositions(eventId, userId);
        }
    }
}
