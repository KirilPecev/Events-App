namespace EventsApp.API.Features.Positions
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;

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
            bool isJoined = await this.positionService.Join(model.EventId, model.PositionId, model.UserId);

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
            bool isUnjoined = await this.positionService.Unjoin(model.EventId, model.PositionId, model.UserId);

            if (!isUnjoined)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
