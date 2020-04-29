namespace EventsApp.API.Features.Events
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class EventController : ApiController
    {
        private readonly IEventService eventService;

        public EventController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<IEnumerable<EventListingServiceModel>> GetAll()
            => await this.eventService.GetAll();

        [HttpGet]
        [Route(nameof(Mine))]
        public async Task<IEnumerable<EventListingServiceModel>> Mine()
        {
            string userId = this.User.GetId();

            return await this.eventService.GetByUser(userId);
        }

        [HttpGet]
        [Route(nameof(Details))]
        public async Task<EventDetailsServiceModel> Details(int id)
        {
            string userId = this.User.GetId();

            return await this.eventService.GetDetails(id, userId);
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult> Create(CreateEventRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.eventService.Create(model.Name, model.Sport, model.Location, model.DateTime, model.Positions, userId);

            return Created(nameof(this.Create), id);
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<ActionResult> Update(UpdateEventRequestModel model)
        {
            string userId = this.User.GetId();

            bool updated = await this.eventService.Update(model.Id, model.Location, model.DateTime, userId);

            if (!updated)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut]
        [Route(nameof(Delete))]
        public async Task<ActionResult> Delete(int id)
        {
            string userId = this.User.GetId();

            bool deleted = await this.eventService.Delete(id, userId);

            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
