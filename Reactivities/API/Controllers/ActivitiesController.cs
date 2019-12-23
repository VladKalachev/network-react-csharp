using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController: ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}