namespace EventsApp.API.Features.Positions
{
    using System.Collections.Generic;
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Threading.Tasks;

    [Authorize]
    public class PositionController : ApiController
    {
        private readonly IPositionService positionService;

        public PositionController(IPositionService positionService)
        {
            this.positionService = positionService;
        }

        [HttpPut]
        [Route(nameof(Join))]
        public async Task<ActionResult> Join(JoinPositionRequestModel model)
        {
            string userId = this.User.GetId();

            bool isJoined = await this.positionService.Join(model.EventId, model.PositionId, userId);

            if (!isJoined)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Unjoin))]
        public async Task<ActionResult> Unjoin(JoinPositionRequestModel model)
        {
            string userId = this.User.GetId();

            bool isUnjoined = await this.positionService.Unjoin(model.EventId, model.PositionId, userId);

            if (!isUnjoined)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        [Route(nameof(GetAvailablePositions))]
        public async Task<IEnumerable<PositionListingServiceModel>> GetAvailablePositions(int eventId)
            => await this.positionService.GetAvailablePositions(eventId);

        [HttpGet]
        [Route(nameof(GetBusyPositions))]
        public async Task<IEnumerable<PositionListingServiceModel>> GetBusyPositions(int eventId)
            => await this.positionService.GetBusyPositions(eventId);
    }
}
