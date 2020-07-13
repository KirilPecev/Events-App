﻿namespace EventsApp.API.Features.Events
{
    using Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using static Infrastructure.WebConstants;

    [Authorize]
    public class EventsController : ApiController
    {
        private readonly IEventService eventService;

        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        [HttpGet]
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
        [Route("Joined")]
        public async Task<IEnumerable<EventListingServiceModel>> EventsImJoined()
        {
            string userId = this.User.GetId();

            return await this.eventService.GetEventsImJoined(userId);
        }

        [HttpGet]
        [Route("upcoming")]
        public async Task<IEnumerable<EventListingServiceModel>> UpcomingEvents()
        {
            string userId = this.User.GetId();

            return await this.eventService.GetUpcomingEvents();
        }

        [HttpGet]
        [Route(Id)]
        public async Task<EventDetailsServiceModel> Details(int id)
        {
            string userId = this.User.GetId();

            return await this.eventService.GetDetails(id, userId);
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateEventRequestModel model)
        {
            string userId = this.User.GetId();

            int id = await this.eventService.Create(model.Name, model.Sport, model.Location, model.DateTime, model.Positions, model.IsSportEvent, userId);

            return Created(nameof(this.Create), id);
        }

        [HttpPut]
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

        [HttpDelete]
        [Route(Id)]
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
